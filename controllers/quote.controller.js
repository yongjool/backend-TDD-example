exports.quote = (req, res) => {
    const MAX_CAR_VALUE = 1000000;
    const MIN_CAR_VALUE = 1887; //1886 + 1
    const MAX_RISK_RATING = 5;
    const MIN_RISK_RATING = 1;

    const { car_value, risk_rating } = req.body;

    let errorMsg = 'Internal error';

    if (
        car_value === undefined ||
        car_value === null ||
        typeof car_value !== 'number'
    )
        return res
            .status(400)
            .json({ error: 'Invalid car value - car value info is missing' });
    if (car_value < MIN_CAR_VALUE)
        return res
            .status(400)
            .json({ error: 'Invalid car value - minimum car value is 1887' });
    if (car_value >= MAX_CAR_VALUE)
        return res.status(400).json({
            error: 'Invalid car value - car value cannot be bigger than 1000000',
        });

    if (
        risk_rating === undefined ||
        risk_rating === null ||
        typeof risk_rating !== 'number'
    )
        return res.status(400).json({
            error: 'Invalid risk_rating - risk rating info is missing',
        });
    if (risk_rating < MIN_RISK_RATING)
        return res
            .status(400)
            .json({ error: 'Invalid risk_rating - minimum risk rating is 1' });
    if (risk_rating > MAX_RISK_RATING)
        return res
            .status(400)
            .json({ error: 'Invalid risk_rating - maximum risk rating is 5' });

    // Example premium calculation logic
    const yearlyPremium = Math.floor((car_value * risk_rating) / 100);
    const monthlyPremium = yearlyPremium / 12;

    // Send response
    res.json({
        monthly_premium: monthlyPremium,
        yearly_premium: yearlyPremium,
    });
};
