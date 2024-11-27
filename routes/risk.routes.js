const express = require('express');
const { calculateRiskRatingController } = require('../controllers/risk.controller');
const router = express.Router();

router.post('/risk-rating', calculateRiskRatingController);

module.exports = router;