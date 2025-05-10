import React from 'react';
import './DashAcess.css';
import { Link } from 'react-router-dom'; 

const Access = () => {
  return (
    <div className="Dash-page">
      
      <div className="transparent-box">
      <h1 className="dash-message">Furni Heaven Employee Access</h1>
        <div className="dbutton-container">
          <Link to="/logistics">
            <button className="dnav-button">Logistic Manager</button>
          </Link>
          
          <Link to="/dashboard/admin">
            <button className="dnav-button">Inventory</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Access;