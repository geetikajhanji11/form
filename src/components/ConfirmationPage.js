// components/ConfirmationPage.js
import React from 'react';

const ConfirmationPage = ({ formData, prevStep }) => {
  const handleSubmit = () => {
    // Submit the form data
    console.log(formData);
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div>
      <h2>Step 3: Confirmation</h2>
      <div>
        <h3>Personal Information</h3>
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>Email: {formData.email}</p>
        <p>Date of Birth: {formData.dateOfBirth}</p>
      </div>
      <div>
        <h3>Address Information</h3>
        <p>Address Line 1: {formData.addressLine1}</p>
        <p>Address Line 2: {formData.addressLine2 || 'N/A'}</p>
        <p>Country: {formData.country}</p>
        <p>State: {formData.state}</p>
        <p>City: {formData.city}</p>
        {/* Display other address information fields */}
      </div>
      <button onClick={handlePrev}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ConfirmationPage;
