
const Admin = require('./admin.mongo')


const createAdmin = async (data) => {
  try {
    const admin = await Admin.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
    });

    return admin._id;
  } catch (error) {
    console.error("Error creating admin:", error);
    
  }
};


const getAdminDetailsById = async (id) => {
  try {
    const cleanId = id.replace(/^:/, '').trim(); // remove leading colon and trim whitespace
    const admin = await Admin.findById(cleanId);

    return admin;
  } catch (err) {
    console.error("Error fetching admin by ID:", err);
    return null;
  }
};





module.exports = {
  createAdmin,
  getAdminDetailsById
};
