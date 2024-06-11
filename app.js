const express = require('express');
const connectDB = require('./database');
const userRoutes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`User servis berjalan di port ${PORT}`);
});