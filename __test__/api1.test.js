const request = require('supertest'); // Library for testing HTTP requests
const app = require('../server'); // Import the server for testing

// Helper function for running tests, takes an object with 3 properties (input, expectedStatus, expectedOutput)
const runTestHelper = async ({ input, expectedStatus, expectedOutput }) => {
    // build query string for the HTTP GET request
    //if input.model and input.year are not null or undefined, add them to array of query parameters
    //push method adds the individual query parameters to the array e.g civic or 2014
    const queryParams = [];
    if (input.model !== null && input.model !== undefined) {
        queryParams.push(`model=${input.model}`);
    }
    if (input.year !== null && input.year !== undefined) {
        queryParams.push(`year=${input.year}`);
    }

    // Build the full query string
    const queryString =
        queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const response = await request(app).get('/api/car-value' + queryString);

    // Assertions
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

    test('Should return an error for negative year', async () => {
        await runTestHelper({
            input: { model: 'Outback', year: -987 },
            expectedStatus: 400,
            expectedOutput: { error: 'Invalid year' },
        });
    });

    test('Should return an error for year past current date', async () => {
        await runTestHelper({
            input: { model: 'Corolla', year: 2029 },
            expectedStatus: 400,
            expectedOutput: { error: 'Invalid year' },
        });
    });

    test('Should return an error for invalid characters in year', async () => {
        await runTestHelper({
            input: { model: 'Corolla', year: 20.2 },
            expectedStatus: 400,
            expectedOutput: { error: 'Invalid year' },
        });
    });

    test('Should return an error for too many characters in model', async () => {
        await runTestHelper({
            input: {
                model: 'hdfquyrhhfbvheqrbfuvyqrwbvhbefhbvqeiurybviuqhebfhivuqbhvqfbivubwhubfiuv',
                year: 2014,
            },
            expectedStatus: 400,
            expectedOutput: { error: 'Model is too long' },
        });
    });
});
