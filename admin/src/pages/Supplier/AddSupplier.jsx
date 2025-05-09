import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AddSupplier.css';

const AddSupplier = () => {
  const [name, setName] = useState('');
  const [company_name, setCompany_Name] = useState('');
  const [contact_number, setContact_Number] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!company_name) newErrors.company_name = 'Company Name is required';
    if (!contact_number) {
      newErrors.contact_number = 'Contact Number is required';
    } else if (!/^\d{10}$/.test(contact_number)) {
      newErrors.contact_number = 'Contact Number must be exactly 10 digits';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    return newErrors;
  };

  const Submit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    axios
      .post('http://localhost:5001/api/suppliers/createSupplier', {
        name,
        company_name,
        contact_number,
        email,
      })
      .then(() => {
        navigate('/listSupplier');
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setErrors({ ...errors, duplicate: err.response.data.message });
        } else {
          console.error(err);
          setErrors({ ...errors, generic: 'An error occurred. Please try again.' });
        }
      });
  };

  return (
    <div className='add-supplier-container'>
      <aside className="sidebar">
        <ul>
          <li><Link to="/logistics">Dashboard</Link></li>
          <li><Link to="/addSupplier">Add Supplier</Link></li>
          <li><Link to="/listSupplier">List Supplier</Link></li>
          <li><Link to="/sup">Low Stock Products</Link></li>
        </ul>
      </aside>
      <main className='form-wrapper'>
        <form onSubmit={Submit}>
          <div className='form-group'>
            <h2>Supplier Management</h2>
            <label htmlFor='name'>Company Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className='error-text'>{errors.name}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='companyName'>Supplier Name</label>
            <input
              type='text'
              id='companyName'
              placeholder='Enter Company Name'
              value={company_name}
              onChange={(e) => setCompany_Name(e.target.value)}
            />
            {errors.company_name && <div className='error-text'>{errors.company_name}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='contactNumber'>Contact Number</label>
            <input
              type='tel'
              id='contactNumber'
              placeholder='Enter Contact Number'
              value={contact_number}
              onChange={(e) => setContact_Number(e.target.value)}
            />
            {errors.contact_number && <div className='error-text'>{errors.contact_number}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className='error-text'>{errors.email}</div>}
          </div>
          {errors.duplicate && <div className='error-text'>{errors.duplicate}</div>}
          {errors.generic && <div className='error-text'>{errors.generic}</div>}
          <button type='submit' className='btn-submit'>Submit</button>
        </form>
      </main>
    </div>
  );
};

export default AddSupplier;