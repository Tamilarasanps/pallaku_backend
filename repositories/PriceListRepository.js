const mongoose = require("mongoose");
const AdminModel = require('../models/Admin');

const GetPriceListRepository = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected");
    }

    const db = mongoose.connection.db;
    const priceCollection = db.collection("priceperkm");
    const adminList = await AdminModel.find();
    const priceList = await priceCollection.find().toArray();
    return {
      priceList: priceList,
      adminPhone: adminList.length > 0 ? adminList[0].mobile : null
    };
  } catch (error) {
    throw new Error("Error fetching price list: " + error.message);
  }
};

module.exports = GetPriceListRepository;
