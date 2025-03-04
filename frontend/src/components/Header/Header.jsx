// import React from 'react';
// import './Header.css';

// const Header = ({ scrollToProducts }) => {
//   return (
//     <div className='header'>
//       <div className="header-contents">
//         <h2>Build Your Dreams, One Tool at a Time</h2>
//         <p>Explore our wide range of quality tools and hardware to make your projects a success. Whether you're a DIY enthusiast or a professional builder, find everything you need at Kandurata Hardware. Start building today!</p>
//         <button onClick={scrollToProducts}>View Shop</button> {/* Button to scroll */}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from 'react';
import './Header.css';

const Header = ({ scrollToProducts }) => {
  return (
    <div className='header'>
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="video-bg"
        poster="/fallback-image.jpg" // Optional fallback image
      >
        <source src="/homepage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="header-contents">
        <h2>Bringing timeless beauty to every space</h2>
        <p>Explore our wide range of premium furniture to transform your space. Whether you're looking for elegant home décor or durable office furniture, find everything you need at FERNIHAVEN. Start creating your perfect space today!</p>
        <button onClick={scrollToProducts}>View Shop</button>
      </div>
    </div>
  );
};

export default Header;