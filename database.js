const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB terhubung untuk User Services');
  } catch (error) {
    console.error('Kesalahan saat menghubungkan ke MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
