const calculateCarValue = (req, res) => {
    const { model, year } = req.body;
};

//Check if model and year are provided
if (!model || !year) {
    return res.status(400).json({ error: 'Invalid model or year' });
}

//check if model is a string and contains at least one letter
if (typeof model !== 'string' || !/[a-zA-Z]/.test(model)) {
    return res.status(400).json({ error: 'Invalid model' });
}

//check if year is valid number
if (typeof year !== 'number' || !Number.isInteger(year)) {
    return res.status(400).json({ error: 'Invalid year' });
}

//check
