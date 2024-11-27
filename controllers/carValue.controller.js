// controllers/carValueController.js

const calculateCarValue = (req, res) => {
    const { model, year } = req.query; // Read from query parameters

    // Check if model and year are provided
    if (!model || !year) {
        return res.status(400).json({ error: 'Invalid model or year' });
    }

    // Validate model and year
    if (typeof model !== 'string' || !/[a-zA-Z]/.test(model)) {
        return res.status(400).json({ error: 'Invalid model' });
    }

    // Convert year to a number (ensure it's an integer)
    const yearNumber = Number(year);

    // Check if the year is a valid number
    if (isNaN(yearNumber) || !Number.isInteger(yearNumber)) {
        return res.status(400).json({ error: 'Invalid year' });
    }

    if (yearNumber < 0) {
        return res.status(400).json({ error: 'Invalid year' });
    }

    // Calculate the car value
    const alphabetValue = model
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .split('')
        .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

    const carValue = alphabetValue * 100 + yearNumber; // Ensure year is a number

    return res.status(200).json({ car_value: carValue });
};

module.exports = { calculateCarValue };
