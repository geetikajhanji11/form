import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const NavBar = () => {
  return (
    <div className="main-navbar">
        
        <div className='upper-content'>
            <div className="left-content">
                <div className="left-content-text">Complete Student Profile</div>
            </div>
            <div className="right-content">
                <div className="right-content-text">I'll do it later</div>
            </div>
        </div>
    </div>
  );
};

export default NavBar;
