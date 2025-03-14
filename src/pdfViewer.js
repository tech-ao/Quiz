import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
