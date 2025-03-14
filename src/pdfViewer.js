import { Document, Page, pdfjs } from "react-pdf";

// Load from the official Mozilla CDN
pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js";

const PDFViewer = ({ base64Data }) => {
  const pdfDataUri = `data:application/pdf;base64,${base64Data}`;

  return (
    <div>
      <Document file={pdfDataUri}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
