// components/AddressInfoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressInfoForm = ({ formData, handleChange, nextStep, prevStep }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch countries from API
    axios.get('https://api.countrystatecity.in/v1/countries', {
      headers: {
        'X-CSCAPI-KEY': 'your-api-key' // Replace 'your-api-key' with your actual API key
      }
    })
    .then(response => {
      setCountries(response.data);
    })
    .catch(error => {
      console.error('Error fetching countries:', error);
    });
  }, []);

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    } else {
      nextStep();
      console.log("error")
      setErrors(validationErrors);
    }
  };

  const handlePrev = () => {
    console.log("handl;e next")
  }
 
  const validate = () => {
    const errors = {};
    if (!formData.addressLine1) {
      errors.addressLine1 = 'Address Line 1 is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.state) {
      errors.state = 'State is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    // Add validation for Pincode if needed
    return errors;
  };

  const handleCountryChange = (countryCode) => {
    // Fetch states for selected country
    axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
      headers: {
        'X-CSCAPI-KEY': 'your-api-key' // Replace 'your-api-key' with your actual API key
      }
    })
    .then(response => {
      setStates(response.data);
    })
    .catch(error => {
      console.error('Error fetching states:', error);
    });
  };

  // Function to fetch cities based on selected state

  return (
    <div>
      <h2>Step 2: Address Information</h2>
      <input
        type="text"
        placeholder="Address Line 1"
        value={formData.addressLine1 || ''}
        onChange={(e) => handleChange({ addressLine1: e.target.value })}
      />
      {errors.addressLine1 && <p>{errors.addressLine1}</p>}
      <input
        type="text"
        placeholder="Address Line 2 (optional)"
        value={formData.addressLine2 || ''}
        onChange={(e) => handleChange({ addressLine2: e.target.value })}
      />
      {/* Add other address fields like Country, State, City, Pincode */}
      {/* Add error messages for address fields */}
      <button onClick={handlePrev}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AddressInfoForm;
