// NavBar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css'; // Assuming you will style the NavBar using CSS

const NavBar = () => {
  const location = useLocation();
  const step = location.pathname;

  const isFirstStep = step === "/";
  const isSecondStep = step === "/address-info";
  const isThirdStep = step === "/confirmation";
  const isLastStep = step === "/form-submitted";

  return (
    <div className="navbar">
        
        <div className='upper-content'>
            <div className="left-content">
                <div className="title">Complete Student Profile</div>
            </div>
            <div className="right-content">
                <div className="title">I'll do it later</div> {/* Align this to the extreme right */}
            </div>
        </div>
        
      <div className="progress-bar">
        <span className={`line ${isFirstStep || isSecondStep || isThirdStep || isLastStep ? 'active' : ''}`}></span>
        <span className={`circle ${isFirstStep || isSecondStep || isThirdStep || isLastStep ? 'active' : ''}`}>
          {isSecondStep || isThirdStep || isLastStep ? '✓' : ''}
        </span>
        <span className={`line ${isSecondStep || isThirdStep || isLastStep ? 'active' : ''}`}></span>
        <span className={`circle ${isSecondStep || isThirdStep || isLastStep ? 'active' : ''}`}>
          {isThirdStep || isLastStep ? '✓' : ''}
        </span>
        <span className={`line ${isThirdStep || isLastStep ? 'active' : ''}`}></span>
      </div>
    </div>
  );
};

export default NavBar;
