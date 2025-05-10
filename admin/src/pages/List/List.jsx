import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateModal from './UpdateModal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './List.css';
import notiIcon from '../../assets/noti_icon.jpeg'; // Import your notification icon
import { Link } from 'react-router-dom'; // Import Link for navigation

const List = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [lowStockAlerts, setLowStockAlerts] = useState([]); // State for low stock alerts
  const [showAlertsPopup, setShowAlertsPopup] = useState(false); // State to toggle popup
 
  const url = "http://localhost:5001/api/product";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/list`);
      if (response.data.success) {
        setProducts(response.data.data);
        const uniqueSuppliers = Array.from(new Set(response.data.data.map(p => p.supplierName)));
        setSuppliers(uniqueSuppliers);

        // Check low stock
        const alerts = response.data.data.filter(p => p.quantity <= 5);
        setLowStockAlerts(alerts);
      } else {
        toast.error("Error fetching products");
      }
    } catch (error) {
      toast.error("Network Error");
      console.error(error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    fetchProducts();
    toast.success("Product updated successfully!");
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        { label: 'Yes', onClick: async () => {
            try {
              const res = await axios.post(`${url}/remove`, { id });
              if (res.data.success) {
                confirmAlert({
                  title: 'Deleted', message: 'Product removed successfully!',
                  buttons: [ { label: 'OK', onClick: () => fetchProducts() } ]
                });
              } else {
                confirmAlert({ title: 'Error', message: 'Error removing product.', buttons: [ { label: 'OK' } ] });
              }
            } catch (err) {
              confirmAlert({ title: 'Network Error', message: 'Issue with network.', buttons: [ { label: 'OK' } ] });
              console.error(err);
            }
          }} ,
        { label: 'No', onClick: () => {} }
      ]
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Product List by Supplier", 14, 16);

    const data = selectedSupplier
      ? products.filter(p => p.supplierName === selectedSupplier)
      : products;

    doc.autoTable({
      head: [['Name','Description','Wholesale Price','Retail Price','Quantity','Category','Date']],
      body: data.map(p => [
        p.name,
        p.description,
        p.wholesalePrice,
        p.retailPrice,
        p.quantity,
        p.category,
        new Date(p.date).toLocaleDateString()
      ])
    });

    if (data.length > 0) {
      const fileName = selectedSupplier ? `${selectedSupplier}-product-list.pdf` : 'all-products.pdf';
      doc.save(fileName);
    } else {
      toast.error("No products found for export");
    }
  };

  const generateCSV = () => {
    const csv = Papa.unparse(products, { fields: ['name','description','wholesalePrice','retailPrice','quantity','category','supplierName','date'] });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'product-list.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="SalesSidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link to="/dashboard/admin">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/add">Add Items</Link></li>
          <li className="sidebar-item"><Link to="/list">Inventory</Link></li>
        </ul>
      </div>

      <div className="product-list-container">
        <h2>Product List</h2>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Notification */}
        <div className="notification-section">
          <div className="notification-icon" onClick={() => setShowAlertsPopup(!showAlertsPopup)}>
            <img src={notiIcon} alt="Notifications" className="noti-icon" />
            {lowStockAlerts.length > 0 && <span className="notification-count">{lowStockAlerts.length}</span>}
          </div>
        </div>

        {showAlertsPopup && (
          <div className="alerts-popup">
            <h3>Low Stock Alerts</h3>
            {lowStockAlerts.length > 0 ? (
              <ul>
                {lowStockAlerts.map(p => (
                  <li key={p._id}>{p.name}: {p.quantity} left <span className="low-stock-message">Low Stock</span></li>
                ))}
              </ul>
            ) : <p>No low stock alerts.</p>}
          </div>
        )}

        <div className="supplier-selection">
          <label htmlFor="supplier">Select Supplier:</label>
          <select id="supplier" value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
            <option value="">All Suppliers</option>
            {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="actions">
          <button onClick={generatePDF}>Download PDF</button>
          <button onClick={generateCSV}>Download CSV</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Wholesale Price</th>
              <th>Retail Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Supplier Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.wholesalePrice}</td>
                <td>{p.retailPrice}</td>
                <td>
                  {p.quantity}
                  {p.quantity <= 5 && <div className="low-stock-container"><span className="low-stock-message">Low Stock</span></div>}
                </td>
                <td>{p.category}</td>
                <td>{p.supplierName}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <UpdateModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default List;