const request = require('supertest'); // Library for testing HTTP requests
const app = require('../server'); // Import the server for testing

// Helper function for running tests
const runTestHelper = async ({ input, expectedStatus, expectedOutput }) => {
    const response = await request(app).post('/api/car-value').send(input);
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedOutput);
};

describe('Car Value API', () => {
    test('Should calculate car value for valid inputs (Sunny day scenario)', async () => {
        await runTestHelper({
            input: { model: 'Civic', year: 2014 },
            expectedStatus: 200,
            expectedOutput: { car_value: 6614 },
        });
    });

    test('Should return an error for models with only numbers', async () => {
        await runTestHelper({
            input: { model: '911', year: 2020 },
            expectedStatus: 400,
            expectedOutput: { error: 'Invalid model' },
        });
    });

    test('Should return an error for invalid year type', async () => {
        await runTestHelper({
            input: { model: 'RAV4', year: 'twenty twenty' },
            expectedStatus: 400,
            expectedOutput: { error: 'Invalid year' },
        });
    });

    test('Should calculate car value for a single-character model', async () => {
        await runTestHelper({
            input: { model: 'A', year: 2018 },
            expectedStatus: 200,
            expectedOutput: { car_value: 2118 },
        });
    });

    test('Should return an error for null model and year', async () => {
        await runTestHelper({
            input: { model: null, year: null },
            expectedStatus: 400,
            expectedOutput: { error: 'Invalid model or year' },
        });
    });
});
