const express = require('express');
const { calculateCarValue } = require('../controllers/carValue.controller');
const router = express.Router();

//Define the route
router.get('/car-value', calculateCarValue);

module.exports = router;
