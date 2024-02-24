// App.js
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormDataProvider } from './FormDataContext';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressInfoForm from './components/AddressInfoForm';
import ConfirmationPage from './components/ConfirmationPage';
import FormSubmittedPage from './components/FormSubmittedPage';
import NavBar from './components/NavBar'; // Import the NavBar component

function App() {
  return (
    <FormDataProvider>
      <Router>
        <Fragment>
          <NavBar /> {/* Include the NavBar component within the Router */}
          <Routes>
            <Route path="/" element={<PersonalInfoForm />} />
            <Route path="/address-info" element={<AddressInfoForm />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/form-submitted" element={<FormSubmittedPage />} />
          </Routes>
        </Fragment>
      </Router>
    </FormDataProvider>
  );
}

export default App;
