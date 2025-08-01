import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';


// For __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import itemRoutes from './routes/items.js';  // Make sure this is also using ES modules
import itemsRouter from "./routes/items.js";
import Item from './models/item.js'; // Import the Item model for search functionality  

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.resolve("uploads"))); // Serve images
app.use("/api/items", itemsRouter);

app.get('/api/items/search', async (req, res) => {
  try {
    const { q } = req.query;
    const results = await Item.find({
      itemName: { $regex: q, $options: 'i' } // case-insensitive match
    });

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/ping', (req, res) => {
  console.log("Ping received");
  res.send("Server is running");
});

app.get('/', (req, res) => res.send('Welcome to ReUseMart Server !'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});