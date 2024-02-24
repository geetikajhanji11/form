// AddressInfoForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContext';

const AddressInfoForm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  const [localFormData, setLocalFormData] = useState({
    addressLine1: formData.addressLine1 || '',
    addressLine2: formData.addressLine2 || '',
    city: formData.city || '',
    state: formData.state || '',
    zipCode: formData.zipCode || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Update local form data when form data context changes
    setLocalFormData({
      addressLine1: formData.addressLine1 || '',
      addressLine2: formData.addressLine2 || '',
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || '',
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const validate = () => {
    const validationErrors = {};
    if (!localFormData.addressLine1) {
      validationErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!localFormData.city) {
      validationErrors.city = 'City is required';
    }
    if (!localFormData.state) {
      validationErrors.state = 'State is required';
    }
    if (!localFormData.zipCode) {
      validationErrors.zipCode = 'Zip Code is required';
    } else if (!/^\d{6}$/.test(localFormData.zipCode)) {
      validationErrors.zipCode = 'Zip Code is invalid';
    }
    return validationErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      updateFormData(localFormData);
      navigate('/confirmation');
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Step 2: Address Information</h2>
      <input
        type="text"
        name="addressLine1"
        placeholder="Address Line 1"
        value={localFormData.addressLine1}
        onChange={handleChange}
      />
      {errors.addressLine1 && <p>{errors.addressLine1}</p>}
      <input
        type="text"
        name="addressLine2"
        placeholder="Address Line 2"
        value={localFormData.addressLine2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={localFormData.city}
        onChange={handleChange}
      />
      {errors.city && <p>{errors.city}</p>}
      <input
        type="text"
        name="state"
        placeholder="State"
        value={localFormData.state}
        onChange={handleChange}
      />
      {errors.state && <p>{errors.state}</p>}
      <input
        type="text"
        name="zipCode"
        placeholder="Zip Code"
        value={localFormData.zipCode}
        onChange={handleChange}
      />
      {errors.zipCode && <p>{errors.zipCode}</p>}
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AddressInfoForm;
