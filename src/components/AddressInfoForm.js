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
    country: formData.country || '',
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
      country: formData.country || '',
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
    if (!localFormData.country) {
      validationErrors.country = 'Country is required';
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
      <h2>Enter your current mailing address</h2>
     
      <div className='form_address'>

      <div>
        <label>Address Line 1 *</label>
        <input
          type="text"
          name="addressLine1"
          placeholder="Enter your address (Apt., suit, house no.)"
          value={localFormData.addressLine1}
          onChange={handleChange}
        />
        {errors.addressLine1 && <p>{errors.addressLine1}</p>}
      </div>

      <div>
        <label>Address Line 2 (optional)</label>
        <input
          type="text"
          name="addressLine2"
          placeholder="Enter your address line"
          value={localFormData.addressLine2}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          placeholder="Select a Country"
          value={localFormData.country}
          onChange={handleChange}
        />
        {errors.country && <p>{errors.country}</p>}
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="Select a City"
          value={localFormData.city}
          onChange={handleChange}
        />
        {errors.city && <p>{errors.city}</p>}
      </div>

      <div>
        <label>State</label>
        <input
          type="text"
          name="state"
          placeholder="Select a State"
          value={localFormData.state}
          onChange={handleChange}
        />
        {errors.state && <p>{errors.state}</p>}
      </div>

      <div>
        <label>Pincode</label>
        <input
          type="text"
          name="zipCode"
          placeholder="Enter Pincode"
          value={localFormData.zipCode}
          onChange={handleChange}
        />
        {errors.zipCode && <p>{errors.zipCode}</p>}
      </div>

    </div>

      <div className='actions'>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Finish</button>
      </div>
    </div>
  );
};

export default AddressInfoForm;
