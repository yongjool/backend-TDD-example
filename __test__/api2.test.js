// api2.test.js
const { calculateRiskRating } = require('./api2'); // Import your API function

describe('API 2: Convert Claim History to Risk Rating', () => {
    test('Valid input with two keywords', () => {
        const input = "A crash and a bump happened last year.";
        const expectedOutput = { risk_rating: 2 };
        expect(calculateRiskRating(input)).toEqual(expectedOutput);
    });

    test('Valid input with all keywords', () => {
        const input = "Collide, smash, crash, scratch, bump!";
        const expectedOutput = { risk_rating: 5 };
        expect(calculateRiskRating(input)).toEqual(expectedOutput);
    });

    test('Valid input with no keywords', () => {
        const input = "No incidents reported.";
        const expectedOutput = { risk_rating: 0 };
        expect(calculateRiskRating(input)).toEqual(expectedOutput);
    });

    test('Invalid input type (number)', () => {
        const input = 12345;
        const expectedOutput = { error: "there is an error" };
        expect(calculateRiskRating(input)).toEqual(expectedOutput);
    });

    test('Invalid input (empty string)', () => {
        const input = "";
        const expectedOutput = { error: "there is an error" };
        expect(calculateRiskRating(input)).toEqual(expectedOutput);
    });
});
