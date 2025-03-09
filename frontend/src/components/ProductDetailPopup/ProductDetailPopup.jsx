import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetailPopup.css';
import { StoreContext } from '../../context/StoreContext';

const ProductDetailPopup = ({ product, onClose }) => {
    const { addToCart } = useContext(StoreContext);
    const [selectedSize, setSelectedSize] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState(product.retailPrice);
    const [addedQuantity, setAddedQuantity] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
    const navigate = useNavigate();

    if (!product) return null;

    // Ensure product.images is an array (fallback to an empty array if undefined)
    const images = Array.isArray(product.images) ? product.images : [product.images];

    // Function to get size options based on category
    const getSizeOptions = (category) => {
        return category === "Paint" ? ["500ml", "1l", "4l", "10l", "20l"] : ["S", "M", "L", "XL", "XXL"];
    };

    const sizeOptions = getSizeOptions(product.category);

    // Update price based on selected size
    useEffect(() => {
        if (selectedSize) {
            let newPrice = product.retailPrice;

            if (product.category === "Paint") {
                if (selectedSize === "4l") {
                    newPrice = product.retailPrice;
                } else if (["500ml", "1l"].includes(selectedSize)) {
                    newPrice *= 0.9;
                } else if (["10l", "20l"].includes(selectedSize)) {
                    newPrice *= 1.1;
                }
            } else {
                if (selectedSize === "L") {
                    newPrice = product.retailPrice;
                } else if (["S", "M"].includes(selectedSize)) {
                    newPrice *= 0.9;
                } else if (["XL", "XXL"].includes(selectedSize)) {
                    newPrice *= 1.1;
                }
            }

            setUpdatedPrice(newPrice);
        } else {
            setUpdatedPrice(product.retailPrice);
        }
    }, [selectedSize, product.retailPrice, product.category]);

    // Handle the Add to Cart button click
    const handleAddToCart = () => {
        const newAddedQuantity = addedQuantity + 1;
        setAddedQuantity(newAddedQuantity);
        addToCart(product._id, selectedSize, product.name, newAddedQuantity);
    };

    // Function to handle image navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="product-detail-popup">
            <div className="product-detail-container">
                <span className="close-btn" onClick={onClose}>&times;</span>

                <div className="product-detail-left">
                    <div className="image-slider">
                        <button className="prev-btn" onClick={prevImage}>&#8249;</button>
                        <img 
                            className="product-detail-image" 
                            src={`${images[currentImageIndex]}`} 
                            alt={product.name} 
                        />
                        <button className="next-btn" onClick={nextImage}>&#8250;</button>
                    </div>
                    <p className="product-detail-materials">
                        We work with monitoring programs to ensure compliance with our social.
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
                        <p>Quantity in stock: {product.quantity}</p>
                        <p>Category: {product.category}</p>
                    </div>

                    {/* Size Selection */}
                    <div className="size-selection">
                        <h3>Select Size:</h3>
                        {sizeOptions.map((size) => (
                            <label key={size}>
                                <input
                                    type="radio"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => setSelectedSize(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>

                    {/* Out of Stock Message */}
                    {product.quantity === 0 ? (
                        <p className="out-of-stock-message">Out of Stock</p>
                    ) : (
                        <div className="button-group">
                            <button 
                                className="add-to-cart-btn" 
                                onClick={handleAddToCart}
                                disabled={!selectedSize} 
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="view-cart-btn" 
                                onClick={() => navigate('/cart')} 
                            >
                                View Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPopup;
