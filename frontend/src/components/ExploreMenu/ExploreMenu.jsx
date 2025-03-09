import React, { useState } from 'react';
import './ExploreMenu.css';
import { category_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Function to handle category selection
  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === "All Products" || selectedCategory === "All Products") {
      setCategory("All Products");
    } else if (selectedCategory === "living room" || selectedCategory === "Living Room") {
      setCategory("Living Room");
    } else if (selectedCategory === "bed room" || selectedCategory === "Bed Room") {
      setCategory("Bed Room");
    } else if (selectedCategory === "kitchen" || selectedCategory === "Kitchen") {
      setCategory("Kitchen");
    } else if (selectedCategory === "office" || selectedCategory === "Office") {
      setCategory("Office");
    } else if (selectedCategory === "outdoor" || selectedCategory === "Outdoor") {
      setCategory("Outdoor");
    } else if (selectedCategory === "dining room" || selectedCategory === "Dining Room") {
      setCategory("Dining Room");
    } else if (selectedCategory === "laundry" || selectedCategory === "Laundry") {
      setCategory("Laundry");
    } else {
      setCategory(prev => prev === selectedCategory ? "All" : selectedCategory);
    }
  };

  return (
    <div className="explore-menu-container">
      {/* Mobile Menu Button, shown only on mobile */}
      <button 
        className="menu-button" 
        onClick={() => setMenuVisible(!menuVisible)}
      >
        &#9776; Categories
      </button>

      {/* Menu Section */}
      <div className={`explore-menu ${menuVisible ? 'visible' : ''}`} id="explore-menu">
        <div className="explore-menu-list">
          {category_list.map((item, index) => (
            <div 
              onClick={() => handleCategoryClick(item.menu_name)} 
              key={index} 
              className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''} ${item.menu_name === 'All' ? 'all-category' : ''}`}
            >
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
