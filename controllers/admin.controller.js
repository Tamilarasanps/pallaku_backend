// controllers/admin.controller.js
const Admin = require("../models/Admin");

exports.updateMobile = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ message: "Mobile number is required" });

    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ mobile });
    } else {
      admin.mobile = mobile;
    }

    await admin.save();
    res.status(200).json({ message: "Admin mobile updated", mobile: admin.mobile });
  } catch (error) {
    console.error("Error updating admin mobile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
