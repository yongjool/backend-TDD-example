const express = require('express');
const { calculateRiskRating } = require('./api2');

const app = express();
app.use(express.json());

app.post('/api/risk-rating', (req, res) => {
    // const { claim_history } = req.body;

    // if (!claim_history) {
    //     return res.status(400).json({ error: "Claim history is required" });
    // }

    // const result = calculateRiskRating(claim_history);
    // if (result.error) {
    //     return res.status(400).json(result);
    // }

    // res.status(200).json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
//    console.log(`Server running on http://localhost:${PORT}`);
});
