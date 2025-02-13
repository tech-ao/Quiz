import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';

const UpdatePassword = ({ closeModal }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert('Password updated successfully!');
      closeModal(); // Close the modal after successful update
    } else {
      alert('New password and confirmation do not match!');
    }
  };

  return (
    <div
      className="password-modal"
      style={{
        position: 'fixed',
        left: '10%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '350px',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      {/* Close button (cross symbol) */}
      <Button
        variant="link"
        onClick={closeModal} // This will trigger the function passed as a prop to close the modal
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '20px',
          color: '#888',
          border: 'none',
          background: 'transparent',
        }}
      >
        ×
      </Button>

      <h2>Update Password</h2>
      <Form onSubmit={handleSubmit}>
        {/* Old Password */}
        <Form.Group controlId="oldPassword" style={{ marginBottom: '10px' }}>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>

        {/* Verify Old Password Checkbox */}
        <Form.Group controlId="verifyCheckbox" style={{ marginBottom: '10px' }}>
          <Form.Check
            type="checkbox"
            label="Verify Old Password"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />
        </Form.Group>

        {/* New Password */}
        <Form.Group controlId="newPassword" style={{ marginBottom: '10px' }}>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!isVerified} // Disable New Password field until old password is verified
          />
        </Form.Group>

        {/* Confirm New Password */}
        <Form.Group controlId="confirmPassword" style={{ marginBottom: '20px' }}>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!isVerified} // Disable Confirm Password field until old password is verified
          />
        </Form.Group>

        {/* Update Password Button */}
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={!isVerified || !newPassword || !confirmPassword}
        >
          Update Password
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePassword;
