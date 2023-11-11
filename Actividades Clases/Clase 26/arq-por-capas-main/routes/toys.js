const express = require('express');
const router = express.Router();
const toysController = require('../controllers/toysController');

// Rutas para juguetes
router.get('/', toysController.getAllToys);
router.post('/', toysController.createToy);

module.exports = router;

