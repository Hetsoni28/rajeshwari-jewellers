import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";

export const generateCatalogPdf = async (category: string, title: string) => {
  try {
    const element = document.getElementById("pdf-catalog-container");
    if (!element) {
      throw new Error("PDF Template element not found");
    }

    // We capture the element which contains multiple pages stacked vertically
    // html-to-image natively supports modern CSS without the lab() parsing errors
    const canvas = await toCanvas(element, {
      pixelRatio: 2, // 2x scale for high resolution (print quality)
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    
    // A4 dimensions at 72 PPI: 210 x 297 mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // The canvas represents multiple pages stacked vertically.
    // Calculate how many pages we have
    const canvasRatio = canvas.height / canvas.width;
    const pageRatio = pdfHeight / pdfWidth;
    
    // Total pages = total canvas height / height of one page in canvas pixels
    // Since our template is styled as stacked A4 pages (794x1123 px each)
    const pxPerPage = canvas.width * pageRatio;
    const totalPages = Math.ceil(canvas.height / pxPerPage);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      // We calculate the Y position offset for this page
      const srcY = i * pxPerPage;
      
      // Calculate how much height is left to draw
      const remainingHeightPx = canvas.height - srcY;
      const drawHeightPx = Math.min(pxPerPage, remainingHeightPx);
      
      // Create a temporary canvas for just this page
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = drawHeightPx;
      const pageCtx = pageCanvas.getContext("2d");
      
      if (pageCtx) {
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas, 
          0, srcY, canvas.width, drawHeightPx, 
          0, 0, canvas.width, drawHeightPx
        );
        
        const pageImgData = pageCanvas.toDataURL("image/jpeg", 1.0);
        
        // Calculate PDF height for this segment
        const drawHeightMm = (drawHeightPx / pxPerPage) * pdfHeight;
        
        pdf.addImage(pageImgData, "JPEG", 0, 0, pdfWidth, drawHeightMm);
      }
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
