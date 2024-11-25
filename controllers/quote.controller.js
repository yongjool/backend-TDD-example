exports.quote = (req, res) => {
    const { car_value, risk_rating } = req.body;
    return res.status(200).json({ error: 'not implemented' });
};
