import React from 'react';
import './DashAcess.css';
import { Link } from 'react-router-dom'; 

const Access = () => {
  return (
    <div className="Dash-page">
      
      <div className="transparent-box">
      <h1 className="dash-message">Furni Heaven Employee Access</h1>
        <div className="dbutton-container">
          <Link to="/sample">
            <button className="dnav-button">Logistic Manager</button>
          </Link>
          
          <Link to="/list">
            <button className="dnav-button">Inventory</button>
          </Link>
          <Link to="/employee">
            {/* <button className="dnav-button">Employee Dashboard</button> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Access;