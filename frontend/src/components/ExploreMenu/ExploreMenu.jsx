import React from 'react';
import './ExploreMenu.css';
import { category_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory, scrollToProducts }) => {
  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === "All" || selectedCategory === "Building and Hardware") {
      setCategory("All Products");
    } else {
      setCategory(prev => prev === selectedCategory ? "All Products" : selectedCategory);
    }
    scrollToProducts();
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Items</h1>
      <p className='explore-menu-text'>
        Discover the perfect tools and materials for any project. Explore our vast selection and make your ideas a reality!
      </p>
      <div className="explore-menu-list">
        {category_list.map((item, index) => (
          <div
            onClick={() => handleCategoryClick(item.menu_name)}
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
