/*import { Document, Page, pdfjs } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const PdfViewer = ({ base64String }) => {
  console.log(base64String);
  
  const pdfData = `data:application/pdf;base64,${base64String}`;
  console.log(pdfData);
  

  return (
    <Document file={pdfData}>
      <Page pageNumber={1} />
    </Document>
  );
};

export default PdfViewer;
*/