const GetPriceListRepository = require("../repositories/PriceListRepository");

const GetPriceList = async (req, res) => {
  try {
    const prices = await GetPriceListRepository();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = GetPriceList;
