const vehicleRepo = require('../repositories/vehicle.repository');

const createVehicle = async (data) => {
  return await vehicleRepo.createVehicle(data);
};

const getAllVehicles = async () => {
  return await vehicleRepo.getAllVehicles();
};

const updateVehicleById = async (id, data, imageFile) => {
  const updates = {
    ...data,
    options: JSON.parse(data.options || "[]"),
  };

  if (imageFile && imageFile.id) {
    updates.img = imageFile.id;
  }

  return await vehicleRepo.updateVehicleInDB(id, updates);
};

const deleteVehicleById = async (id) => {
  return await vehicleRepo.deleteVehicleFromDB(id);
};

module.exports = { createVehicle , getAllVehicles, deleteVehicleById, updateVehicleById};
