// api2.js
function calculateRiskRating(claimHistory) {
    // Check if the input is invalid
    if (typeof claimHistory !== 'string' || claimHistory.trim() === '') {
        return { error: claimHistory === '' ? "Input cannot be empty" : "Invalid input type" };
    }

    // Define keywords to search for in the claim history
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    const lowerCaseHistory = claimHistory.toLowerCase();

    // Count occurrences of each keyword in the input
    const riskRating = keywords.reduce((count, keyword) =>
        count + (lowerCaseHistory.split(keyword).length - 1), 0
    );

    // Return the calculated risk rating
    return { risk_rating: riskRating };
}

module.exports = { calculateRiskRating };
