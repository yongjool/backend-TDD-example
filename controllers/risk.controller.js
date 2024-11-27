const { calculateRiskRating } = require('../services/api2');

const calculateRiskRatingController = (req, res) => {
    const { claim_history } = req.body;
    const result = calculateRiskRating(claim_history);
    res.status(result.error ? 400 : 200).json(result);
};

module.exports = { calculateRiskRatingController };
