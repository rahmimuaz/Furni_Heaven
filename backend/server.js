import express from 'express';
import 'dotenv/config';  // Keep this to load environment variables from .env
import cors from 'cors';
import { connectDB } from './config/db.js';

import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import driverRoutes from './routes/driverRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRouter from './routes/cartRoute.js';
import supplierRoutes from './routes/supplierRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import furnitureRouter from './routes/furniture.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// API endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/drivers", driverRoutes);
app.use("/api", orderRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/suppliers", supplierRoutes);
app.use("/api", cardRoutes);
app.use("/api/furniture", furnitureRouter);

// Static files
app.use("/images", express.static('uploads'));

// Simple route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
