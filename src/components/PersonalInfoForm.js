// components/PersonalInfoForm.js
import React, { useState } from 'react';

const PersonalInfoForm = ({ formData, handleChange, nextStep }) => {
  const [errors, setErrors] = useState({});
  
  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 10) {
        errors.dateOfBirth = 'Age should be at least 10 years';
      } else if (age > 30) {
        errors.dateOfBirth = 'Age should not exceed 30 years';
      }
    }
    return errors;
  };

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName || ''}
        onChange={(e) => handleChange({ firstName: e.target.value })}
      />
      {errors.firstName && <p>{errors.firstName}</p>}
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName || ''}
        onChange={(e) => handleChange({ lastName: e.target.value })}
      />
      {errors.lastName && <p>{errors.lastName}</p>}
      <input
        type="email"
        placeholder="Email"
        value={formData.email || ''}
        onChange={(e) => handleChange({ email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="date"
        placeholder="Date of Birth"
        value={formData.dateOfBirth || ''}
        onChange={(e) => handleChange({ dateOfBirth: e.target.value })}
      />
      {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default PersonalInfoForm;
