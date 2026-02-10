require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const recordRoutes = require('./routes/records');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/aat_db';

mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch((err) => {
    console.error('DB connection error', err);
    process.exit(1);
  });

