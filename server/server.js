const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

const authenticate = require('./middlewares/authenticate');

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));
