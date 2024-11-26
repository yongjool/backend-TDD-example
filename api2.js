// api2.js
function calculateRiskRating(claimHistory) {
    if (typeof claimHistory !== 'string' || claimHistory.trim() === '') {
        return { error: "there is an error" };
    }

    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    const lowerCaseHistory = claimHistory.toLowerCase();
    const riskRating = keywords.reduce((count, keyword) => 
        count + (lowerCaseHistory.split(keyword).length - 1), 0
    );

    return { risk_rating: riskRating };
}

module.exports = { calculateRiskRating };
