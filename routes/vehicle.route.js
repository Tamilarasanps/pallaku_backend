const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const vehicleCtrl = require('../controllers/vehicle.controller');
const secureRoute = require('../middlewares/secureRoutes')

router.post('/create',secureRoute, upload.single('img'), vehicleCtrl.createVehicle);
router.get("/", vehicleCtrl.getAllVehicles);
router.put("/update-vehicle/:id",secureRoute, upload.single("img"), vehicleCtrl.updateVehicle);
router.delete("/delete-vehicle/:id",secureRoute, vehicleCtrl.deleteVehicle);

module.exports = router;
