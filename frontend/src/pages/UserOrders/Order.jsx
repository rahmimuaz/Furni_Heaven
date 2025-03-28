import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Order.css'; // Ensure this path is correct

const UserOrders = () => {
    const { token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/orders', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched Orders:', data.orders); // Log orders to see the structure
                setOrders(data.orders); // Ensure this matches your backend response
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    // Helper function to convert cart data (with keys like "66f5c4c08348e06b7524726d-L") to a simpler array of objects
    const convertCartDataToArray = (cartData) => {
        if (!cartData || typeof cartData !== 'object') {
            return []; // Return an empty array if cartData is invalid
        }

        // Loop through the keys of the cartData and extract the item details
        return Object.keys(cartData).map(key => {
            const item = cartData[key]; // Get the item data (name, quantity, size, etc.)
            return {
                name: item.name || "Unknown Item", // Fallback for missing name
                quantity: item.quantity || 0, // Fallback for missing quantity
                size: item.size || "N/A" // Fallback for missing size
            };
        });
    };

    return (
        <div className="order-container">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <div className="table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Address</th>
                                <th>Payment Method</th>
                                <th>Ordered Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.status}</td>
                                    <td>{order.address}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>
                                        {order.items && order.items.length > 0 ? (
                                            <ul className="items-list">
                                                {order.items.map((cartData, index) => (
                                                    convertCartDataToArray(cartData).map((item, idx) => (
                                                        <li key={`${index}-${idx}`}>
                                                            {item.name} - Quantity: {item.quantity} {item.size ? `(Size: ${item.size})` : "(Size: N/A)"}
                                                        </li>
                                                    ))
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No items found for this order.</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserOrders;
