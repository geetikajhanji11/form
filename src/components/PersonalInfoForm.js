// PersonalInfoForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContext';

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  // Initialize local state with formData from context
  const [localFormData, setLocalFormData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    dateOfBirth: formData.dateOfBirth || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Update local form data if formData context changes
    setLocalFormData({
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      dateOfBirth: formData.dateOfBirth || '',
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const validate = () => {
    const validationErrors = {};
    if (!localFormData.firstName) {
      validationErrors.firstName = 'First Name is required';
    }
    if (!localFormData.lastName) {
      validationErrors.lastName = 'Last Name is required';
    }
    if (!localFormData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(localFormData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!localFormData.dateOfBirth) {
      validationErrors.dateOfBirth = 'Date of Birth is required';
    }
    // Additional validation can be added here
    return validationErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      updateFormData(localFormData); // Update the context with current form data
      navigate('/address-info');
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    navigate("/");
  }

  return (
    <div>
      <h2>Let's Enter your Personal Details</h2>

      <div className='form_personal'>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={localFormData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={localFormData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div>
          <label>Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={localFormData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={localFormData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
        </div>
      </div>

      <div className='actions'>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Save & Continue</button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
