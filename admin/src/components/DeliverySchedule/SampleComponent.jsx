import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './SampleComponent.css';
import Navbar from '../Navbar/Navbar';
const SampleComponent = () => {
    const [orders, setOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const navigate = useNavigate();

    const allProvinces = [
        "Western Province", "Central Province", "Southern Province",
        "Eastern Province", "Northern Province", "North Western Province",
        "North Central Province", "Uva Province", "Sabaragamuwa Province"
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5001/api');
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(`Order Fetch Error: ${err.message}`);
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await fetch('http://localhost:5001/drivers');
                if (!response.ok) throw new Error('Failed to fetch drivers');
                const data = await response.json();
                setDrivers(data);
            } catch (err) {
                setError(`Driver Fetch Error: ${err.message}`);
            }
        };

        fetchOrders();
        fetchDrivers().finally(() => setLoading(false));
    }, []);

    const handleSelectChange = (orderId, driverId) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order._id === orderId ? { ...order, driverId } : order
            )
        );
    };

    const handleCheckboxChange = (orderId) => {
        setSelectedOrders(prev => {
            const updated = new Set(prev);
            updated.has(orderId) ? updated.delete(orderId) : updated.add(orderId);
            return updated;
        });
    };

    const handleAssignDrivers = () => {
        const unassigned = Array.from(selectedOrders).filter(orderId => {
            const order = orders.find(o => o._id === orderId);
            return !order?.driverId;
        });

        if (unassigned.length > 0) {
            alert('Please select a driver for all selected orders.');
            return;
        }

        const assignments = Array.from(selectedOrders).map(orderId => {
            const order = orders.find(o => o._id === orderId);
            const driver = drivers.find(d => d._id === order.driverId);
            return {
                orderId,
                driverId: order.driverId,
                driverName: driver ? `${driver.firstName} ${driver.lastName}` : 'Unassigned',
                ...order,
            };
        });

        navigate('/assigned-orders', { state: { assignments } });
    };

    const handleBack = () => navigate('/logistics');

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Delivery Schedule Report', 14, 10);

        const tableColumn = ["Order ID", "User ID", "Items", "Amount", "Date", "Address", "Province"];
        const tableRows = [];

        filteredOrders.forEach(order => {
            const orderData = [
                order._id,
                order.userId,
                order.items.map(itemObj => {
                    const item = Object.values(itemObj)[0];
                    return `${item.name} (Qty: ${item.quantity})`;
                }).join(", "),
                `$${order.amount}`,
                new Date(order.date).toLocaleDateString(),
                order.address,
                order.province,
            ];
            tableRows.push(orderData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("delivery_schedule_report.pdf");
    };

    const filteredOrders = orders.filter(order =>
        order.province.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedProvince === '' || order.province === selectedProvince)
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
       
        <div className="sample-component-container">
            <div className="sample-component-sidebar">
                <ul>
                    <li><Link to="/logistics">Dashboard</Link></li>
                    <li><Link to="/sample">Manage Order</Link></li>
                    <li><Link to="/sup">Supplier Manager</Link></li>
                    <li><Link to="/drivers">Driver Details</Link></li>
                    <li><Link to="/drivers/add">Add Driver</Link></li>
                    <li><Link to="/drivers">Delete Driver</Link></li>
                </ul>
            </div>

            <div className="sample-component-content">
                <h1 className="header1">Delivery Schedule</h1>

                <div className="controls-container">
                    <div className="sort-bar-container">
                        <label htmlFor="provinceSelect">Sort by Province: </label>
                        <select
                            id="provinceSelect"
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                        >
                            <option value="">All Provinces</option>
                            {allProvinces.map(province => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>

                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="Search by province..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-bar"
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>User ID</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Province</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.has(order._id)}
                                        onChange={() => handleCheckboxChange(order._id)}
                                    />
                                </td>
                                <td>{order.userId}</td>
                                <td>
                                    <ul>
                                        {order.items.map((itemObj, idx) => {
                                            const item = Object.values(itemObj)[0];
                                            return (
                                                <li key={idx}>{item.name} (Qty: {item.quantity})</li>
                                            );
                                        })}
                                    </ul>
                                </td>
                                <td>${order.amount}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.address}</td>
                                <td>{order.province}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="assign-driver-container">
                    <select
                        onChange={(e) => {
                            const driverId = e.target.value;
                            selectedOrders.forEach(orderId =>
                                handleSelectChange(orderId, driverId)
                            );
                        }}
                    >
                        <option value="">Select Driver</option>
                        {drivers.length > 0 ? (
                            drivers.map(driver => (
                                <option key={driver._id} value={driver._id}>
                                    {driver.firstName} {driver.lastName} ({driver.vehicleModel})
                                </option>
                            ))
                        ) : (
                            <option disabled>No drivers available</option>
                        )}
                    </select>

                    <button
                        className="assign-driver-btn"
                        onClick={handleAssignDrivers}
                        disabled={selectedOrders.size === 0}
                    >
                        Assign to Driver
                    </button>
                    <button className="back-btn" onClick={handleBack}>Back to Dashboard</button>
                    <button className="pdf-btn" onClick={generatePDF}>Download PDF Report</button>
                </div>
            </div>
        </div>
    );
};

export default SampleComponent;
