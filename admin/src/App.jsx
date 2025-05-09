import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Driver from './pages/driver/Driver'; //DS
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import LogisticsManagerDashboard from './pages/Dashboard/LogisticsManagerDashboard';
import DriverForm from './pages/driver/DriverForm';
import DriverList from './pages/driver/DriverList';
import EditDriver from './pages/driver/EditDriver';
import SampleComponent from './components/DeliverySchedule/SampleComponent' //DS
import AssignedOrders from './components/DeliverySchedule/AssignedOrders' // DS
import SupplierList from './pages/Supplier/SupplierList';
import AddSupplier from './pages/Supplier/AddSupplier';
import UpdateSupplier from './pages/Supplier/UpdateSupplier';
import SupplierComponent from './components/DeliverySchedule/SupplierComponet';
import DashboardAcess from "./pages/DashboardAccess/DashboardAccess"


const App = () => {
  return (
    <div>
      <div className="app-content">
         <Navbar />
        <Routes>
          <Route path="/" element={<DashboardAcess />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/logistics" element={<LogisticsManagerDashboard />} />
          <Route path="/drivers" element={<DriverList />} />
          <Route path="/drivers/add" element={<DriverForm />} />
          <Route path="/edit-driver/:id" element={<EditDriver />} />
          <Route path="/drivers/orders" element={<Driver />} />{/* DS */}
          <Route path="/sample" element={<SampleComponent />} />{/* DS */}
          <Route path="/assigned-orders" element={<AssignedOrders />} /> {/* DS */}
          <Route path="/sup" element={<SupplierComponent/>}/>
          <Route path="/addSupplier" element={<AddSupplier/>}/>
          <Route path="/listSupplier" element={<SupplierList/>}/>
          <Route path="/updateSupplier/:id" element={<UpdateSupplier />} />
          <Route path="/acess" element={<DashboardAcess />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
