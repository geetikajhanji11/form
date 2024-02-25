import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContext';
import "./PersonalInfoForm.css"
import SingleLine from './SingleLine';

const PersonalInfoForm = ({ onNextStep }) => {
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
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Update local form data if formData context changes
    setLocalFormData({
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      dateOfBirth: formData.dateOfBirth || '',
    });
  }, [formData]);

  useEffect(() => {
    // Check if all fields are filled and valid
    const allFieldsFilled = Object.values(localFormData).every(value => value.trim() !== '');
    const noErrors = Object.keys(errors).length === 0;

    setIsButtonEnabled(allFieldsFilled && noErrors);
  }, [localFormData, errors]);

  const validate = () => {
    const validationErrors = {};
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 30); // 30 years ago from now
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 10); // 10 years ago from now

    if (!localFormData.firstName) {
      validationErrors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z]+$/.test(localFormData.firstName)) {
      validationErrors.firstName = 'First Name is invalid';
    }
    if (!localFormData.lastName) {
      validationErrors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+$/.test(localFormData.lastName)) {
      validationErrors.lastName = 'Last Name is invalid';
    }
    if (!localFormData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(localFormData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!localFormData.dateOfBirth) {
      validationErrors.dateOfBirth = 'Date of Birth is required';
    } else {
      const dob = new Date(localFormData.dateOfBirth);
      if (dob > maxDate || dob < minDate) {
        validationErrors.dateOfBirth = 'Age should be between 10 and 30 years';
      }
    }
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  
    // Validate the field being changed
    const newErrors = { ...errors }; // Copy existing errors
    if (value.trim() === '') {
      // Field is empty, add/set the error
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } 
    
    else if (name === 'firstName' && /\d/.test(value)) {
      newErrors[name] = 'First Name is invalid';
    }

    else if (name === 'lastName' && /\d/.test(value)) {
      newErrors[name] = 'Last Name is invalid';
    }
    else if (name === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      // Email is not valid
      newErrors[name] = 'Email is invalid';
    } else {
      // Field is valid, remove the error
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      updateFormData(localFormData); // Update the context with current form data
      onNextStep(); 
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    navigate("/");
  }

  return (
    <div className='personal-info-page'>

      <div className='form-upper-body'>
      <h2>Let's Enter your Personal Details</h2>

      <div className='form-personal row'>

        <div className='form-field col col-lg-4 col-md-6 col-sm-12'>
          <div><label>First Name</label></div>
          <input
            className={errors.firstName ? "error-input-field" : "input-field"}
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={localFormData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className='error'>{errors.firstName}</p>}
        </div>
        
        <div className='form-field col col-lg-4 col-md-6 col-sm-12'>
          <div><label>Last Name</label></div>
          <input
            className={errors.lastName ? "error-input-field" : "input-field"}
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={localFormData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className='error'>{errors.lastName}</p>}
        </div>

        <div className='form-field col col-lg-4 col-md-6 col-sm-12'>
          <div><label>Email ID</label></div>
          <input
            className={errors.email ? "error-input-field" : "input-field"}
            type="email"
            name="email"
            placeholder="Enter your email id"
            value={localFormData.email}
            onChange={handleChange}
          />
          {errors.email && <p className='error'>{errors.email}</p>}
        </div>

        <div className='form-field col col-lg-4 col-md-6 col-sm-12'>
          <div><label>Date of Birth</label></div>
          <input
            className={errors.dateOfBirth ? "error-input-field" : "input-field"}
            type="date"
            name="dateOfBirth"
            placeholder="DD/MM/YYYY"
            value={localFormData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p className='error'>{errors.dateOfBirth}</p>}
        </div>
      </div>

      </div>

      <div className='footer'>
        <SingleLine />
        <div className='actions'>
          <button className='back-button' onClick={handleBack}>Back</button>
          <button className='save-and-continue-button' disabled={!isButtonEnabled} onClick={handleNext}>Save & Continue</button>
        </div>
      </div>
      
    </div>
  );
};

export default PersonalInfoForm;
