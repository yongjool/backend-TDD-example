const { calculateRiskRating } = require('../api2');

const calculateRiskRatingController = (req, res) => {
    try {
        const { claim_history } = req.query; // Use req.query to get the query parameter
        if (!claim_history) {
            return res.status(400).json({ error: 'claim_history is required' });
        }
        const result = calculateRiskRating(claim_history);
        res.status(result.error ? 400 : 200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { calculateRiskRatingController };
