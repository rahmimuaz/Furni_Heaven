import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, featuredProducts, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">
      <h1 className="cart-title">Your Shopping Cart</h1>
      <div className="cart-table-container">
        {Object.keys(cartItems).length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Add</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cartItems).map((itemId, index) => {
                const product = featuredProducts.find((item) => item._id === itemId); // Find product by _id
                const cartItem = cartItems[itemId]; // Access the specific cart item (including quantity and size)
                if (product) {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:5001/images/${product.image}`}
                          alt={product.name}
                          className="cart-item-image"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>Rs.{product.retailPrice}</td>
                      <td>{cartItem.quantity}</td>
                      <td>Rs.{product.retailPrice * cartItem.quantity}</td>
                      <td>
                        <button onClick={() => addToCart(itemId)} className="cart-action-btn">
                          +
                        </button>
                      </td>
                      <td>
                        <button onClick={() => removeFromCart(itemId)} className="cart-action-btn">
                          x
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        ) : (
          <p className="empty-cart-message">No items in the cart.</p>
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <hr />
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{totalAmount}</b>
            </div>
          </div>
          <button
            onClick={() => navigate('/order')}
            disabled={totalAmount === 0}
            className={totalAmount === 0 ? 'disabled' : ''}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
