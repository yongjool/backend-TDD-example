// Constants
const MAX_CAR_VALUE = 1000000;
const MIN_CAR_VALUE = 1887; // 1886 + 1
const MAX_RISK_RATING = 5;
const MIN_RISK_RATING = 1;

// Helper Functions for Validation
const isValidNumber = (value) => {
    return (
        typeof value === 'number' &&
        value !== null &&
        value !== undefined &&
        !isNaN(value)
    );
};

const validateCarValue = (car_value) => {
    if (!isValidNumber(car_value)) {
        return 'Invalid car value - car value info is missing';
    }
    if (car_value < MIN_CAR_VALUE) {
        return `Invalid car value - minimum car value is ${MIN_CAR_VALUE}`;
    }
    if (car_value >= MAX_CAR_VALUE) {
        return `Invalid car value - car value cannot be bigger than ${MAX_CAR_VALUE}`;
    }
    return null; // Valid
};

const validateRiskRating = (risk_rating) => {
    if (!isValidNumber(risk_rating)) {
        return 'Invalid risk_rating - risk rating info is missing';
    }
    if (risk_rating < MIN_RISK_RATING) {
        return `Invalid risk_rating - minimum risk rating is ${MIN_RISK_RATING}`;
    }
    if (risk_rating > MAX_RISK_RATING) {
        return `Invalid risk_rating - maximum risk rating is ${MAX_RISK_RATING}`;
    }
    return null; // Valid
};

// Quote Calculation Handler
exports.quote = (req, res) => {
    const { car_value, risk_rating } = req.query;

    const car_valueNumber = Number(car_value);
    const risk_ratingNumber = Number(risk_rating);

    // Validate inputs
    const carValueError = validateCarValue(car_valueNumber);
    if (carValueError) {
        return res.status(400).json({ error: carValueError });
    }

    const riskRatingError = validateRiskRating(risk_ratingNumber);
    if (riskRatingError) {
        return res.status(400).json({ error: riskRatingError });
    }

    // Calculate premiums
    const yearlyPremium = Math.floor(
        (car_valueNumber * risk_ratingNumber) / 100,
    );
    const monthlyPremium = parseFloat((yearlyPremium / 12).toFixed(2));

    // Send response
    res.json({
        monthly_premium: monthlyPremium,
        yearly_premium: yearlyPremium,
    });
};
