import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './OrderConfirmation.css'; // Optional: Add CSS for styling

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the order data passed in the state
  const { orderId, orderDetails = {}, totalAmount } = location.state || {}; 

  // Define formattedOrderId safely
  const formattedOrderId = orderId ? `#${orderId.toString().padStart(6, '0')}` : 'N/A';

  // Log the order details to check if they are being passed correctly
  useEffect(() => {
    console.log('Order Details:', orderDetails);  // Check the console for output
  }, [orderDetails]);

  // Function to render the order details in the table
  const renderOrderDetails = () => {
    const productKeys = Object.keys(orderDetails);
    
    if (productKeys.length === 0) {
      return <tr><td colSpan="3">No order details available</td></tr>;
    }

    return productKeys.map((key, index) => {
      const item = orderDetails[key];
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          {/* <td>{item.size ? `Size: ${item.size}` : 'N/A'}</td> */}
        </tr>
      );
    });
  };

  // Function to generate the invoice
  const generateInvoice = () => {
    const doc = new jsPDF();

    // Add title and order ID
    doc.setFontSize(18);
    doc.text('Invoice', 14, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${formattedOrderId}`, 14, 30);

    // Add order details table
    const productKeys = Object.keys(orderDetails);
    let currentY = 40;
    doc.text('Product Name', 14, currentY);
    doc.text('Quantity', 120, currentY);
    currentY += 10;

    productKeys.forEach((key) => {
      const item = orderDetails[key];
      doc.text(item.name, 14, currentY);
      doc.text(item.quantity.toString(), 120, currentY);
      currentY += 10;
    });

    // Add total amount
    doc.text(`Total Amount: Rs.${totalAmount}`, 14, currentY + 10);

    // Save the document as a PDF
    doc.save(`invoice_${orderId}.pdf`);
  };

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>

      {orderId ? (
        <div>
          <p>Thank you for your order!</p>
          <p>Your Order ID: <strong>{formattedOrderId}</strong></p>

          <h2>Order Details</h2>

          <table className="order-details">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                {/* <th>Size</th> */}
              </tr>
            </thead>
            <tbody>
              {renderOrderDetails()}
            </tbody>
          </table>

          <h3>Total Amount: Rs.{totalAmount}</h3>

          {/* Button to generate invoice */}
          <button onClick={generateInvoice}>Generate Invoice</button>

          {/* Button to navigate to Homepage */}
          <button onClick={() => navigate('/')}>Go to Homepage</button>
        </div>
      ) : (
        <p>It seems like there was an issue with your order. Please try again.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
