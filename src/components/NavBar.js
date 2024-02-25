import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const NavBar = () => {
  const location = useLocation();
  const step = location.pathname;

  const isFirstStep = step === "/";
  const isSecondStep = step === "/address-info";
  const isThirdStep = step === "/confirmation";
  const isLastStep = step === "/form-submitted";

  // Helper function to determine which icon to display
  const renderIcon = (isActive, isCompleted) => {
    return isCompleted ? (
      <CheckCircleOutlineOutlinedIcon className={`icon ${isActive ? 'active' : ''}`} />
    ) : (
      <AdjustOutlinedIcon className={`icon ${isActive ? 'active' : ''}`} />
    );
  };

  return (
    <div className="main-navbar">
        
        <div className='upper-content'>
            <div className="left-content">
                <div className="title">Complete Student Profile</div>
            </div>
            <div className="right-content">
                <div className="title">I'll do it later</div>
            </div>
        </div>
        { (isFirstStep || isSecondStep || isThirdStep) &&
        <div className='form-progress-bar-wrapper'>
          <div className="form-progress-bar">
            <span className={`line ${isFirstStep || isSecondStep || isThirdStep || isLastStep ? 'line-active' : ''}`}></span>
            {renderIcon(true, isSecondStep || isThirdStep || isLastStep)}
            <span className={`line ${isSecondStep || isThirdStep || isLastStep ? 'line-active' : ''}`}></span>
            {renderIcon(isSecondStep || isThirdStep || isLastStep, isThirdStep || isLastStep)}
            <span className={`line ${isThirdStep || isLastStep ? 'line-active' : ''}`}></span>
          </div>
        </div>
}
      
    </div>
  );
};

export default NavBar;
