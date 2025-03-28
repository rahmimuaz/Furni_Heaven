import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import microphone_icon from '../../assets/microphone.png';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const Navbar = ({ setShowLogin, scrollToProduct }) => {
  const [menu, setMenu] = useState("Home");
  const { token, setToken, featuredProducts } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const [isListening, setIsListening] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // For mobile menu toggle

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");  
    setShowLogin(true); 
    setShowPopup(true); 
    setTimeout(() => {
      setShowPopup(false); 
    }, 3000);
    setMenu("Home");
  };

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <div className='navbar'>
      <img src='./logo.png' alt="" />

      {/* Menu Toggle for Mobile */}
      <button className="menu-toggle" onClick={handleMenuToggle}>
        ☰
      </button>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMenuVisible ? 'show' : ''}`}>
        {/* Close Button for Mobile */}
        <button className="menu-close" onClick={handleCloseMenu}>
          ×
        </button>

        <Link to='./'>
          <li
            onClick={() => {
              setMenu("Home");
              handleCloseMenu();
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <Link to='/contact-us'>
          <li
            onClick={() => {
              setMenu("Contact Us");
              handleCloseMenu();
            }}
            className={menu === "Contact Us" ? "active" : ""}
          >
            Contact Us
          </li>
        </Link>

        {/* New Design Button */}
        <Link to='/design'>
          <li
            onClick={() => {
              setMenu("Design");
              handleCloseMenu();
            }}
            className={menu === "Design" ? "active" : ""}
          >
            Design
          </li>
        </Link>

        {/* Right Side Content Inside the Menu for Mobile */}
        <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> 
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li>
                  <Link to="/u-orders">
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </Link>
                </li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          )}
        </div>
      </ul>

      {showPopup && (
        <div className="logout-popup">
          <p>You've been logged out.</p>
        </div>
      )}
      
    </div>
  );
};

export default Navbar;
