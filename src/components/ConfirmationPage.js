// ConfirmationPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContext';

const ConfirmationPage = () => {
  const { formData } = useFormData();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Here you might want to actually submit the form data to a backend
    console.log('Submitting form data:', formData);

    // Navigate to the form submitted page upon successful submission
    navigate('/form-submitted');
  };

  const handleBack = () => {
    navigate("/address-info");
  }

  return (
    <div>
      <h2>Confirm Your Information</h2>
      <div>
        <strong>Personal Info:</strong>
        <p>Name: {formData.firstName} {formData.lastName}</p>
        <p>Email: {formData.email}</p>
        <p>DOB: {formData.dateOfBirth}</p>

      </div>
      <div>
        <strong>Address:</strong>
        <p>Address Line 1: {formData.addressLine1}</p>
        <p>Address Line 2: {formData.addressLine2}</p>
        <p>City: {formData.city}</p>
        <p>State: {formData.state}</p>
        <p>Zip Code: {formData.zipCode}</p>
      </div>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleSubmit}>Confirm and Submit</button>
    </div>
  );
};

export default ConfirmationPage;
