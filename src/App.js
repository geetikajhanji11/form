// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormDataProvider } from './FormDataContext';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressInfoForm from './components/AddressInfoForm';
import ConfirmationPage from './components/ConfirmationPage';
import FormSubmittedPage from './components/FormSubmittedPage';

function App() {
  return (
    <FormDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PersonalInfoForm />} />
          <Route path="/address-info" element={<AddressInfoForm />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/form-submitted" element={<FormSubmittedPage />} />
        </Routes>
      </Router>
    </FormDataProvider>
  );
}

export default App;
