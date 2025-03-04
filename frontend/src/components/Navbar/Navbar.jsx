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

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setSearchQuery(""); // Clear the search query
    } else {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        setSearchQuery(voiceInput);
        setIsListening(false);
      };

      recognition.onspeechend = () => {
        setIsListening(false);
        recognition.stop();
      };

      recognition.onerror = (event) => {
        console.error(event.error);
        setIsListening(false);
      };
    }
  };

  const filteredProducts = featuredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false); // Close menu when the close button is clicked
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
              handleCloseMenu(); // Close the menu after setting the active menu item
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <Link to='/card'>
          <li
            onClick={() => {
              setMenu("card");
              handleCloseMenu(); // Close the menu after setting the active menu item
            }}
            className={menu === "card" ? "active" : ""}
          >
            Card
          </li>
        </Link>
        <Link to='/contact-us'>
          <li
            onClick={() => {
              setMenu("Contact Us");
              handleCloseMenu(); // Close the menu after setting the active menu item
            }}
            className={menu === "Contact Us" ? "active" : ""}
          >
            Contact Us
          </li>
        </Link>

        {/* Right Side Content Inside the Menu for Mobile */}
        <div className='navbar-right'>
          <img
            src={assets.search_icon}
            alt="Search"
            onClick={handleSearchClick}
            className='search-icon'
          />
          <div className={`navbar-search ${isSearching ? 'show' : ''}`}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={toggleListening} className='voice-search-btn'>
              <img src={microphone_icon} alt="Voice Search" />
            </button>
            {isListening && <p>Listening...</p>}
            <div className='search-results'>
              {searchQuery && filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map(product => (
                    <li key={product._id} className='search-result-item' onClick={() => {
                      scrollToProduct(product._id); // Use scrollToProduct to scroll to the product
                    }}>
                      <img src={`http://localhost:5001/images/${product.image}`} alt={product.name} className='search-result-image' />
                      <div>
                        <h4>{product.name}</h4>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : searchQuery ? (
                <p>No products found.</p>
              ) : null}
            </div>
          </div>
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
