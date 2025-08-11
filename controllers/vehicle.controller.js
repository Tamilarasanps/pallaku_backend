const vehicleService = require('../services/vehicle.service');

const createVehicle = async (req, res) => {
  try {
    const { type, capacity, oneWayPrice, roundTripPrice, options } = req.body;

    const vehicle = await vehicleService.createVehicle({
      type,
      capacity,
      oneWayPrice,
      roundTripPrice,
      options: JSON.parse(options),
      img: req.file.id, // Store the file ID only
    });

    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updates = req.body;
    const image = req.file;

    console.log(image)
    console.log(updates)

    const updated = await vehicleService.updateVehicleById(vehicleId, updates, image);
    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ error: "Failed to update vehicle" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    await vehicleService.deleteVehicleById(vehicleId);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
};

module.exports = {
  createVehicle, getAllVehicles, updateVehicle, deleteVehicle
};
