const mongoose = require("mongoose");

const GetPriceListRepository = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected");
    }

    const db = mongoose.connection.db;
    const priceCollection = db.collection("priceperkm");
    const priceList = await priceCollection.find().toArray();

    return priceList;
  } catch (error) {
    throw new Error("Error fetching price list: " + error.message);
  }
};

module.exports = GetPriceListRepository;
