const bcrypt = require('bcrypt');
const User = require('./model');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar' }); // 409 Conflict
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user); // 201 Created
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' }); // 500 Internal Server Error
    console.error('Gagal register user:', error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' }); // 401 Unauthorized
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' }); // 401 Unauthorized
    }

    res.status(200).json({ message: 'Login berhasil', user }); // 200 OK
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' }); // 500 Internal Server Error
    console.error('Gagal login:', error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // 200 OK
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' }); // 500 Internal Server Error
    console.error('Gagal getUsers:', error.message);
  }
};

module.exports = { registerUser, loginUser, getUsers };
