// App.js
import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormDataProvider } from './FormDataContext';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressInfoForm from './components/AddressInfoForm';
import ConfirmationPage from './components/ConfirmationPage';
import FormSubmittedPage from './components/FormSubmittedPage';
import NavBar from './components/NavBar';
import ProgressBar from './components/ProgressBar';
import SingleLine from './components/SingleLine';

import "./App.css"

function App() {
  const [currentStep, setCurrentStep] = useState(1); // State to manage current step

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <FormDataProvider>
      <Router>
        <Fragment>
          

          <h1>UPPER LANDING PAGE</h1>

          <div className='main-form-container'>
            <NavBar />
            <SingleLine />
            <ProgressBar currentStep={currentStep} /> {/* Pass currentStep as prop */}
            <div className="form-container">
              {/* Render components conditionally based on currentStep */}
              {currentStep === 1 && <PersonalInfoForm onNextStep={handleNextStep} />}
              {currentStep === 2 && <AddressInfoForm onNextStep={handleNextStep} onPrevStep={handlePrevStep} />}
              {currentStep === 3 && <ConfirmationPage onNextStep={handleNextStep} onPrevStep={handlePrevStep} />}
              {currentStep === 4 && <FormSubmittedPage />}
            </div>
          </div>

          <h1>LOWER LANDING PAGE</h1>


        </Fragment>
      </Router>
    </FormDataProvider>
  );
}

export default App;
