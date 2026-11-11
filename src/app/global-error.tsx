"use client";

/**
 * Last-resort error screen: used only if the root layout itself fails, so it can't rely on
 * the layout's fonts, CSS or components. Kept self-contained with inline styles.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFAFA",
          color: "#3E2723",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <main>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#866E23", margin: "0 0 16px" }}>
            Rajeshwari Jewellers
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 400, margin: "0 0 12px" }}>Something went wrong</h1>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#6B7280", margin: "0 0 32px" }}>
            Please try again, or call us on{" "}
            <a href="tel:+919825953334" style={{ color: "#866E23" }}>
              +91 98259 53334
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#866E23",
              color: "#fff",
              border: 0,
              padding: "14px 32px",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
