import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup'; 
import { StoreContext } from './context/StoreContext';
import OrderConfirmation from './pages/OrderConformation/OrderConfirmation';
import UserOrders from './pages/UserOrders/Order';
import Card from './pages/Card/CardManager';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import AiDesign from './pages/aidesign/aidesign';



import FurnitureDesigner from './pages/FurnitureDesigner/FurnitureDesigner.jsx';
import Contact from './pages/Contact/Contact.jsx';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './pages/utils/theme.jsx'; // Ensure you have a theme.js defined

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false); 
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <div className="app">
      <Navbar setShowLogin={setShowLogin} token={token} />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/card" element={<Card />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/u-orders" element={<UserOrders />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/login" element={<LoginPopup setShowLogin={setShowLogin} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/design" element={<AiDesign />} />

          {/* Additional Pages */}
          <Route path="/furniture-designer" element={<FurnitureDesigner />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
