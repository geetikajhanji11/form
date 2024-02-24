import React, { useState } from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressInfoForm from './components/AddressInfoForm';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (newFormData) => {
    setFormData({ ...formData, ...newFormData });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AddressInfoForm
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ConfirmationPage
            formData={formData}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Multi-step Form</h1>
      {renderStep()}
    </div>
  );
};

export default App;
