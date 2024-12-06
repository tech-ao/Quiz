import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Form , Container} from 'react-bootstrap';
import './AgreeandSign.css'

const AgreeAndSign = () => {
  const signaturePad = useRef(null);
  const [signatureData, setSignatureData] = useState(null);
  const [agree, setAgree] = useState(false);

  const handleClear = () => {
    signaturePad.current.clear();
    setSignatureData(null);
  };

  const handleSave = () => {
    if (signaturePad.current.isEmpty()) {
      alert("Please provide your e-signature.");
    } else {
      const signatureImage = signaturePad.current.getTrimmedCanvas().toDataURL('image/png');
      setSignatureData(signatureImage); // Save the signature as a Base64 image
      alert("Signature saved successfully!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("You must agree to the terms and conditions.");
    } else if (!signatureData) {
      alert("Please provide your e-signature.");
    } else {
      alert("Form submitted successfully!");
      // Process signatureData (e.g., save to the server)
    }
  };

  return (
    <Container className="p-4 bg-light">
      <h3 className="mb-4">Agree and Sign</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Check 
            type="checkbox" 
            label="I agree to the terms and conditions"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
        </Form.Group>
        
        <div className="signature-area mb-3">
          <p>Please sign below:</p>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: "signature-canvas border"
            }}
            ref={signaturePad}
          />
        </div>

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Signature
          </Button>
        </div>

        {signatureData && (
          <div className="mt-3">
            <p>Preview of your signature:</p>
            <img src={signatureData} alt="Signature" style={{ border: "1px solid #ddd", maxWidth: "100%" }} />
          </div>
        )}

        <Button type="submit" className="btn btn-success mt-4">
     Submit
        </Button>
      </Form>
      </Container>
  );
};

export default AgreeAndSign;
