const express = require('express');
const { calculateRiskRatingController } = require('../controllers/risk.controller');
const router = express.Router();

// Use GET method to handle risk rating
router.get('/risk-rating', calculateRiskRatingController);

module.exports = router;
