const calculateCarValue = (req, res) => {
    const { model, year } = req.query; // Destructure model and year from the query string

    // Check if both model and year are missing/fasly
    if (!model && !year) {
        return res.status(400).json({ error: 'Invalid model or year' });
    }

    // Check if model is invalid
    if (!model || typeof model !== 'string' || !/[a-zA-Z]/.test(model)) {
        return res.status(400).json({ error: 'Invalid model' });
    }

    // Check if model length is too long
    if (model.length > 50) {
        return res.status(400).json({ error: 'Model is too long' });
    }

    // Convert year to a number (ensure it's an integer)
    const yearNumber = Number(year);
    // Function to get the current year
    const getCurrentYear = () => new Date().getFullYear();

    // Check if the year is invalid
    if (
        !year ||
        isNaN(yearNumber) ||
        !Number.isInteger(yearNumber) ||
        yearNumber < 1900 ||
        yearNumber > getCurrentYear()
    ) {
        return res.status(400).json({ error: 'Invalid year' });
    }

    // Calculate the car value
    const alphabetValue = model
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .split('')
        .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

    //calculate final car value
    const carValue = alphabetValue * 100 + yearNumber;

    return res.status(200).json({ car_value: carValue });
};

module.exports = { calculateCarValue };
