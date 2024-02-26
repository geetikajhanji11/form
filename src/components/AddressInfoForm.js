import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContext';
import './AddressInfoForm.css';
import SingleLine from './SingleLine';
import axios from 'axios';

const AddressInfoForm = ({ onNextStep, onPrevStep }) => {
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
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const allRequiredFieldsFilled = Object.keys(localFormData).filter(key => key !== 'addressLine2').every(key => localFormData[key].trim() !== '');
    const noErrors = Object.keys(errors).length === 0;
    setIsButtonEnabled(allRequiredFieldsFilled && noErrors);
  }, [localFormData, errors]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': 'SnRtbGU0V1gzcEltbklESDhMOXVHZlUyaGxtcXIwQnFGUVhTdlVSOQ==',
        },
      });
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
        headers: {
          'X-CSCAPI-KEY': 'SnRtbGU0V1gzcEltbklESDhMOXVHZlUyaGxtcXIwQnFGUVhTdlVSOQ==',
        },
      });
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
        headers: {
          'X-CSCAPI-KEY': 'SnRtbGU0V1gzcEltbklESDhMOXVHZlUyaGxtcXIwQnFGUVhTdlVSOQ==',
        },
      });
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
   

    
    setLocalFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'country') {
      const selectedCountry = countries.find(country => country.iso2 === value);
      const countryName = selectedCountry ? selectedCountry.name : '';
  
      setCountry(countryName)
      setLocalFormData(prevState => ({
        ...prevState,
        state: '',
        city: ''
      }));
      fetchStates(value);
    } else if (name === 'state') {
      const selectedState = states.find(state => state.iso2 === value);
      const stateName = selectedState ? selectedState.name : '';
      setState(stateName)
      setLocalFormData(prevState => ({
        ...prevState,
        city: ''
      }));
      fetchCities(localFormData.country, value);
    } else if(name === 'city') {
    

      const selectedCity = cities.find(city => {
     
        return city.id.toString() === value
      });
      const cityName = selectedCity ? selectedCity.name : 'nto found';
      setCity(cityName)
    }
  };
  

  const validate = () => {
    const validationErrors = {};
    // Validation logic
    return validationErrors;
  };

  const handleNext = () => {
    console.log("country = " + country);
    const updatedLocalFormData = {
      ...localFormData,
      country: country,
      state: state,
      city: city
    };

    console.log(updatedLocalFormData);
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
        // Use updatedLocalFormData here directly as it contains the latest state
        updateFormData(updatedLocalFormData);
        onNextStep();
    } else {
        setErrors(validationErrors);
    }
};

  const handleBack = () => {
    onPrevStep()
  };

  return (
    <div className='address-info-page'>

<div className='form-upper-body'>
      <h2>Enter your current mailing address</h2>
     
      <div className='form_address'>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Address Line 1 <span className='required'>*</span></label>
            <input
              type="text"
              className={errors.addressLine1 ? "form-control is-invalid" : "form-control"}
              name="addressLine1"
              placeholder="Enter your address (Apt., suit, house no.)"
              value={localFormData.addressLine1}
              onChange={handleChange}
            />
            {errors.addressLine1 && <div className="invalid-feedback">{errors.addressLine1}</div>}
          </div>
          <div className="form-group col-md-6">
            <label>Address Line 2 (optional)</label>
            <input
              type="text"
              className="form-control"
              name="addressLine2"
              placeholder="Enter your address line"
              value={localFormData.addressLine2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-4">
            <label>Country</label>
            <select
              className={errors.country ? "form-control is-invalid" : "form-control"}
              name="country"
              value={localFormData.country}
              onChange={handleChange}
            >
              <option value="">Select a Country</option>
              {countries.map(country => (
                <option key={country.iso2} value={country.iso2}>{country.name}</option>
              ))}
            </select>
            {errors.country && <div className="invalid-feedback">{errors.country}</div>}
          </div>
          <div className="form-group col-md-4">
            <label>State</label>
            <select
              className={errors.state ? "form-control is-invalid" : "form-control"}
              name="state"
              value={localFormData.state}
              onChange={handleChange}
            >
              <option value="">Select a State</option>
              {states.map(state => (
                <option key={state.iso2} value={state.iso2}>{state.name}</option>
              ))}
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
          <div className="form-group col-md-4">
            <label>City</label>
            <select
              className={errors.city ? "form-control is-invalid" : "form-control"}
              name="city"
              value={localFormData.city}
              onChange={handleChange}
            >
              <option value="">Select a City</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-4">
            <label>Pincode</label>
            <input
              type="text"
              className={errors.zipCode ? "form-control is-invalid" : "form-control"}
              name="zipCode"
              placeholder="Enter Pincode"
              value={localFormData.zipCode}
              onChange={handleChange}
            />
            {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
          </div>
        </div>
      </div>

      </div>

      <div className='footer'>
        <SingleLine />
        <div className='actions'>
          <button className='back-button' onClick={handleBack}>Back</button>
          <button className='save-and-continue-button' disabled={!isButtonEnabled} onClick={handleNext}>Finish</button>
        </div>
      </div>
    </div>
  );
};

export default AddressInfoForm;
