import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import driverRoutes from './routes/driverRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRouter from './routes/cartRoute.js';
import supplierRoutes from './routes/supplierRoutes.js';
import cardRoutes from './routes/cardRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

//API endpoint
app.use("/api/product",productRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use('/drivers', driverRoutes);
app.use('/api', orderRoutes);
app.use('/api/cart',cartRouter)
app.use('/api/suppliers', supplierRoutes);
app.use('/api', cardRoutes);



// Static file serving
app.use('/images', express.static('uploads'));

// Simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


