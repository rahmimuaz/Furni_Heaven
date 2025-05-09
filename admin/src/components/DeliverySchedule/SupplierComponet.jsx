import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SupplierComponent.css';

const SupplierComponent = () => {
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const productApi = "http://localhost:5001/api/product/list";
  const supplierApi = "http://localhost:5001/api/suppliers/getSuppliers";

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, supplierRes] = await Promise.all([
          axios.get(productApi),
          axios.get(supplierApi),
        ]);

        if (productRes.data.success) {
          const filtered = productRes.data.data.filter(p => p.quantity <= 5);
          setLowStockProducts(filtered);
        }

        if (supplierRes.data) setSuppliers(supplierRes.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getSupplierEmail = (supplierName) => {
    const supplier = suppliers.find(s => s.name === supplierName);
    return supplier ? supplier.email : 'No email available';
  };

  const handleRequestProduct = (productNames, supplierName) => {
    const email = getSupplierEmail(supplierName);
    const mailto = `mailto:${email}?subject=Request%20for%20Product:%20${productNames}&body=Dear%20${supplierName},%0D%0AI would like to request the following product(s):%0D%0A${productNames}%0D%0A%0D%0AThank you,%0D%0A[Your Name]`;
    window.location.href = mailto;
  };

  const groupBySupplier = (products) => {
    return products.reduce((acc, product) => {
      const { supplierName } = product;
      if (!acc[supplierName]) acc[supplierName] = [];
      acc[supplierName].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupBySupplier(lowStockProducts);

  return (
    <div className="supplier-component">
      <aside className="sidebar">
        <ul>
          <li><Link to="/logistics">Dashboard</Link></li>
          <li><Link to="/addSupplier">Add Supplier</Link></li>
          <li><Link to="/listSupplier">List Supplier</Link></li>
          <li><Link to="/low-stock">Low Stock Products</Link></li>
        </ul>
      </aside> 

      <main className="content">
        <h1>Low Stock Products</h1>
        {lowStockProducts.length ? (
          <table className="product-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Products</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedProducts).map(([supplierName, products]) => (
                <tr key={supplierName}>
                  <td>{supplierName}</td>
                  <td>
                    <ul>
                      {products.map(p => (
                        <li key={p._id}>{p.name} (Qty: {p.quantity})</li>
                      ))}
                    </ul>
                  </td>
                  <td>{getSupplierEmail(supplierName)}</td>
                  <td>
                    <button
                      onClick={() => handleRequestProduct(
                        products.map(p => p.name).join(', '), 
                        supplierName
                      )}
                      className="request-btn"
                    >
                      Request Products
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No low stock products.</p>
        )}
      </main>
    </div>
  );
};

export default SupplierComponent;
