import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

/** Wait until every <img> inside the element has finished loading (or failed). */
const waitForImages = async (element: HTMLElement) => {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          })
    )
  );
};

export const generateCatalogPdf = async (_category: string, title: string) => {
  try {
    const container = document.getElementById("pdf-catalog-container");
    if (!container) {
      throw new Error("PDF Template element not found");
    }

    await waitForImages(container);

    // Each A4 page of the template (794 x 1123 px) is captured on its own.
    // Capturing the whole container as one canvas breaks on larger catalogs
    // because browsers cap canvas height (~16k–32k px).
    const pages = Array.from(container.querySelectorAll<HTMLElement>(".pdf-page"));
    if (pages.length === 0) {
      throw new Error("PDF Template has no pages");
    }

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const pageImg = await toJpeg(pages[i], {
        pixelRatio: 2, // print quality
        quality: 0.92,
        backgroundColor: "#ffffff",
      });
      if (i > 0) pdf.addPage();
      pdf.addImage(pageImg, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    // Generate SEO friendly filename
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    pdf.save(`${cleanTitle}-catalog.pdf`);

    return true;
  } catch (error) {
    console.error("PDF Generation failed:", error);
    throw error;
  }
};
