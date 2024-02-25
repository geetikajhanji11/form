import React from 'react';
import { useLocation } from 'react-router-dom';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import './ProgressBar.css'; // Assuming the CSS needed for ProgressBar is in NavBar.css

const ProgressBar = ({currentStep}) => {


  const isFirstStep = currentStep == 1;
  const isSecondStep = currentStep == 2;
  const isThirdStep = currentStep == 3;
  const isLastStep = currentStep == 4;

  // Helper function to determine which icon to display
  const renderIcon = (isActive, isCompleted) => {
    return isCompleted ? (
      <CheckCircleOutlineOutlinedIcon className={`icon ${isActive ? 'active' : ''}`} />
    ) : (
      <AdjustOutlinedIcon className={`icon ${isActive ? 'active' : ''}`} />
    );
  };

  return (
    <div>
      { (isFirstStep || isSecondStep) &&
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

export default ProgressBar;
