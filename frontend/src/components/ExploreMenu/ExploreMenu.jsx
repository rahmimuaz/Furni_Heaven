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
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Items</h1>
        <p className='explore-menu-text'>Discover the perfect tools and materials for any project. Explore our vast selection and make your ideas a reality!</p>
        <div className="explore-menu-list">
            {category_list.map((item, index) => {
                return (
                    <div 
                        onClick={() => handleCategoryClick(item.menu_name)} 
                        key={index} 
                        className="explore-menu-list-item"
                    >
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                );
            })}
        </div>
        <hr />
    </div>
  );
}

export default ExploreMenu;