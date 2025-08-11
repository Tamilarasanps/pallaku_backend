const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const vehicleCtrl = require('../controllers/vehicle.controller');

router.post('/create', upload.single('img'), vehicleCtrl.createVehicle);
router.get("/", vehicleCtrl.getAllVehicles);
router.put("/update-vehicle/:id", upload.single("img"), vehicleCtrl.updateVehicle);
router.delete("/delete-vehicle/:id", vehicleCtrl.deleteVehicle);

module.exports = router;
