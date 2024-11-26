exports.quote = (req, res) => {
    const MAX_CAR_VALUE = 1000000;
    const MIN_CAR_VALUE = 1887; //1886 + 1

    const { car_value, risk_rating } = req.body;

    if (
        !car_value ||
        typeof car_value !== 'number' ||
        car_value <= MIN_CAR_VALUE ||
        car_value >= MAX_CAR_VALUE
    ) {
        return res.status(400).json({ error: 'Invalid car value' });
    }
    if (
        !risk_rating ||
        typeof risk_rating !== 'number' ||
        risk_rating < 1 ||
        risk_rating > 5
    ) {
        return res.status(400).json({ error: 'Invalid risk_rating' });
    }

    // Example premium calculation logic
    const yearlyPremium = Math.floor((car_value * risk_rating) / 100);
    const monthlyPremium = yearlyPremium / 12;

    // Send response
    res.json({
        monthly_premium: monthlyPremium,
        yearly_premium: yearlyPremium,
    });
};
