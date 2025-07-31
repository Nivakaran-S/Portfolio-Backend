const { createAdmin, getAdminById, updateAdmin, deleteAdmin, getAllAdmins, searchAdmins } = require('../../models/admin/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin/admin.mongo')

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, gender } = req.body;
    // Ensure email is unique (add to schema or check here)
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminId = await createAdmin({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      gender,
    });
    return res.status(201).json({ message: 'Admin created successfully', id: adminId });
  } catch (err) {
    console.error('Error in registering admin:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/', // <- don't skip this
      maxAge: 3600000,
    });

    return res.status(200).json({ message: 'Login successful', id: user._id, role: 'admin' });
  } catch (err) {
    console.error('Error in logging in:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};