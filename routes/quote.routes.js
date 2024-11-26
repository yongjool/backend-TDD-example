const express = require('express');
const router = express.Router();
const { quote } = require('../controllers/quote.controller');

// Define the route
router.get('/quote', quote);

module.exports = router;
