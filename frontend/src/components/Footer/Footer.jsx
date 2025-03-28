import React from 'react';
import './Footer.css';
import logo from '../../assets/logofooter.png'; // Adjust the path if necessary
import facebookIcon from '../../assets/facebook_icon.png';
import twitterIcon from '../../assets/twitter_icon.png';
import linkedinIcon from '../../assets/linkedin_icon.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="ifooter-section description">
                    <img src={logo} alt="Company Logo" className="footer-logo" />
                    {/* <p>Your trusted destination for quality building materials, tools, and gardening supplies. Established in 2012, we offer a wide range of products tailored to meet the needs of both DIY enthusiasts and professionals. Experience exceptional service, competitive prices, and expert advice—all under one roof!</p> */}
                    
                    {/* Social Media Icons Section
                    <div className="social-media-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter" className="social-icon" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                        </a>
                    </div> */}
                </div>
                <div className="ifooter-section links">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/careers">Careers</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="ifooter-section contact">
                    <h3>GET IN TOUCH</h3>
                    <p>Address:64/1 Rajasinghe Road Kandy</p>
                    <p>Email: furnihaven@gmail.com</p>
                    <p>Phone: 081 2055220</p>
                    {/* Social Media Icons Section */}
                    <div className="social-media-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter" className="social-icon" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="ifooter-bottom" style={{ textAlign: 'center', padding: '10px 0', color: '58311', color: 'white' }}>
                <p>&copy; {new Date().getFullYear()} FURNIHAVEN Furnitures. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
