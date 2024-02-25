import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const NavBar = () => {

  const location = useLocation();
  const step = location.pathname;

  const isFirstStep = step === "/";
  const isSecondStep = step === "/address-info";
  const isThirdStep = step === "/confirmation";
  const isLastStep = step === "/form-submitted";

  return (
    <div className="main-navbar">
        
        <div className='upper-content'>
            <div className="left-content">
                <div className="left-content-text">Complete Student Profile</div>
            </div>
            <div className="right-content">
                <div className="right-content-text">{isFirstStep || isSecondStep ? "I'll do it later" : isThirdStep ? "" : <CloseRoundedIcon />}</div>
            </div>
        </div>
    </div>
  );
};

export default NavBar;
