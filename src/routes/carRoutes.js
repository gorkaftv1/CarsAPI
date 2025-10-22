const express = require('express');
const router = express.Router();

const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    getCarsByMake
} = require('../controllers/carController');

// Rutas - El orden importa: específicas primero, genéricas después
router.get('/', getAllCars);
router.post('/', createCar);
router.get('/make/:make', getCarsByMake);  // Antes de /:id
router.get('/:id', getCarById);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;