import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetailPopup.css';
import { StoreContext } from '../../context/StoreContext';

const ProductDetailPopup = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(StoreContext);

  // Ensure product exists before using state
  if (!product) return null;

  const [updatedPrice, setUpdatedPrice] = useState(product.retailPrice || 0);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle price update if product changes
  useEffect(() => {
    setUpdatedPrice(product.retailPrice || 0);
  }, [product]);

  const handleAddToCart = () => {
    if (product.quantity === 0) return; // Prevent adding out-of-stock items

    const newAddedQuantity = addedQuantity + 1;
    setAddedQuantity(newAddedQuantity);

    addToCart(product._id, "", product.name, newAddedQuantity);
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2500);
  };

  return (
    <div className="product-detail-popup">
      <div className="product-detail-container">
        <span className="close-btn" onClick={onClose}>&times;</span>

        <div className="product-detail-left">
          <img 
            className="product-detail-image" 
            src={`http://localhost:5001/images/${product.image}`} 
            alt={product.name} 
          />
          <div className="product-info-small">Materials, Care and Origin</div>
          <p className="product-detail-materials">
            We work with monitoring programs to ensure compliance with our social, environmental and health and safety standards.
          </p>
        </div>

        <div className="product-detail-right">
          <div className="product-detail-header">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-detail-pricing">
            <p className="old-price">Retail Price: LKR {product.retailPrice}</p>
            <p className="updated-price">Updated Price: LKR {updatedPrice.toFixed(2)}</p>
            <p className="qty">Quantity in stock: {product.quantity}</p>
            <p className="category">Category: {product.category}</p>
          </div>

          {product.quantity === 0 ? (
            <p className="out-of-stock-message">Out of Stock</p>
          ) : (
            <div className="button-group">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="view-cart-btn" onClick={() => navigate('/cart')}>
                View Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          <div className="success-icon-container">
            <span className="success-icon">✔</span>
          </div>
          Item successfully added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetailPopup;
