const Vehicle = require('../models/vehicle.model');

const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

const getAllVehicles = async () => {
  return await Vehicle.find();
};

const updateVehicleInDB = async (id, updateData) => {
  return await Vehicle.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteVehicleFromDB = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};


module.exports = { createVehicle,getAllVehicles,updateVehicleInDB,deleteVehicleFromDB };
