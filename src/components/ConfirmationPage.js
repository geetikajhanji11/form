import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContext';
import './ConfirmationPage.css'; // Import CSS for ConfirmationPage
import SingleLine from './SingleLine';

const ConfirmationPage = ({ onNextStep }) => {
  const { formData } = useFormData();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Here you might want to actually submit the form data to a backend
    console.log('Submitting form data:', formData);

    // Navigate to the form submitted page upon successful submission
    onNextStep();
  };

  const handleBack = () => {
    navigate("/address-info");
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="confirmation-page">
      <div className='confirm-heading'>Confirm Your Information</div>
      
      {/* Personal Info Section */}
      <div className="personal-info-section">
        <div className='detail-headings'><h3>Personal Details</h3></div>
        <div className="row">
          <div className="col">
            <div className='item'><span className="label">First Name</span> <span className="value">{formData.firstName}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">Last Name</span> <span className="value">{formData.lastName}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">Email</span> <span className="value">{formData.email}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">DOB</span> <span className="value">{formatDate(formData.dateOfBirth)}</span></div>
          </div>
        </div>
      </div>
      
      {/* Address Details Section */}
      <div className="address-details-section">
      <div className='detail-headings'><h3>Mailing Address</h3></div>
        <div className="row">
          <div className="col">
          <div className='item'><span className="label">Address Line 1</span> <span className="value">{formData.addressLine1}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">Address Line 2</span> <span className="value">{formData.addressLine2}</span></div>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <div className='item'><span className="label">City</span> <span className="value">{formData.city}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">State</span> <span className="value">{formData.state}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">Country</span> <span className="value">{formData.country}</span></div>
          </div>
          <div className="col">
          <div className='item'><span className="label">Zip Code</span> <span className="value">{formData.zipCode}</span></div>
          </div>
        </div>
      </div>

      <div className='footer'>
        <SingleLine />
        <div className='actions'>
          <button className='back-button' onClick={handleBack}>Back</button>
          <button className='save-and-continue-button' onClick={handleSubmit}>Confirm and Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
