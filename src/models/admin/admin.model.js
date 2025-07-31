const Admin = require('./admin.mongo');

const createAdmin = async (data) => {
  try {
    const admin = await Admin.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password, // Ensure to hash the password before saving in production
      phoneNumber: data.phoneNumber,
      gender: data.gender,
    });
    return admin._id;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

const getAdminDetailsById = async (id) => {
  try {
    const cleanId = id.replace(/^:/, '').trim();
    const admin = await Admin.findById(cleanId);
    return admin;
  } catch (err) {
    console.error("Error fetching admin by ID:", err);
    throw err;
  }
};

const updateAdmin = async (id, data) => {
  try {
    const cleanId = id.replace(/^:/, '').trim();
    const admin = await Admin.findByIdAndUpdate(
      cleanId,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
      },
      { new: true, runValidators: true }
    );
    return admin;
  } catch (err) {
    console.error("Error updating admin:", err);
    throw err;
  }
};

const deleteAdmin = async (id) => {
  try {
    const cleanId = id.replace(/^:/, '').trim();
    await Admin.findByIdAndDelete(cleanId);
    return true;
  } catch (err) {
    console.error("Error deleting admin:", err);
    throw err;
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await Admin.find({});
    return admins;
  } catch (err) {
    console.error("Error fetching all admins:", err);
    throw err;
  }
};

const searchAdmins = async (query) => {
  try {
    const admins = await Admin.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
    return admins;
  } catch (err) {
    console.error("Error searching admins:", err);
    throw err;
  }
};

module.exports = {
  createAdmin,
  getAdminDetailsById,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  searchAdmins,
};