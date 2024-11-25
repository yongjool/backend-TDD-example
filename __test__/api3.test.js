const request = require('supertest');
const app = require('../server');

/*
This API takes 2 parameters as input in JSON format that includes 
- the "car value" (e.g. $6,614) and "risk rating" of the driver between 1 to 5 (e.g. 5 meaning high risk).  

And the output is a JSON format with the suggested monthly and yearly premium for the insurance policy, such as "$50", "$614,".  

Here are the example specifications and business rules of conversion:
 INPUT	                            OUTPUT	                                        ERROR OUTPUT
{ car_value: 6614; risk_rating: 5}	{ monthly_premium: 27.5; yearly_premium: 330}	{ error: "there is an error"}


BUSINESS RULES

Yearly premium is calculated by car_value multiplied by driver rating divided by 100.   
For example, car value of $6,614 and driver rating of 5, the yearly premium will be $6,614 * 5 / 100 = $330.  
The monthly premium is the yearly premium divided by 12.  
So the monthly premium in this example will be $300 /12 = $27.5.  
If input values are not valid, return an error.
*/

const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;

const runTestHelper = async (input, expectedStatus, expectedOutput) => {
    const response = await request(app).get('/api/quote').send(input);

    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedOutput);
};

describe('Quote API', () => {
    //for logic test with valid input
    test('valid car value and high risk rating', async () => {
        const input = { car_value: 6614, risk_rating: 5 };
        const expectedOutput = {
            monthly_premium: 27.5,
            yearly_premium: 330,
        };
        const expectedStatus = STATUS_OK;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });

    test('valid car value and low risk rating', async () => {
        const input = { car_value: 6614, risk_rating: 1 };
        const expectedOutput = {
            monthly_premium: 66,
            yearly_premium: 5.5,
        };
        const expectedStatus = STATUS_OK;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('valid car value and middle risk rating', async () => {
        const input = { car_value: 6614, risk_rating: 3 };
        const expectedOutput = {
            monthly_premium: 198,
            yearly_premium: 16.5,
        };
        const expectedStatus = STATUS_OK;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });

    //invalid test
    test('invalid car value - negative', async () => {
        const input = { car_value: -6614, risk_rating: 3 };
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('invalid risk rating - too high', async () => {
        const input = { car_value: 6614, risk_rating: 6 };
        const expectedOutput = {
            error: 'Invalid risk_rating',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('invalid risk rating - too low', async () => {
        const input = { car_value: 6614, risk_rating: 0 };
        const expectedOutput = {
            error: 'Invalid risk_rating',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });

    test('missing car value', async () => {
        const input = { risk_rating: 3 };
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('missing risk rating', async () => {
        const input = { car_value: 6614 };
        const expectedOutput = {
            error: 'Invalid risk_rating',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('missing car value and risk rating', async () => {
        const input = {};
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });

    //edge test
    test('invalid car value format', async () => {
        const input = { car_value: 'asdlf#@$(%*()', risk_rating: 3 };
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('invalid risk rating - format', async () => {
        const input = { car_value: 6614, risk_rating: '/three?' };
        const expectedOutput = {
            error: 'Invalid risk_rating',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });

    test('valid car value - extreme low', async () => {
        //minimum value = > 1886 + 1  = 1887
        const input = { car_value: 10, risk_rating: 3 };
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
    test('valid car value - extreme high', async () => {
        const input = { car_value: 1000000, risk_rating: 3 };
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });

    test('invalid input', async () => {
        const input = { value: 6614, rating: 3 };
        const expectedOutput = {
            error: 'Invalid car value',
        };
        const expectedStatus = STATUS_BAD_REQUEST;

        await runTestHelper(input, expectedStatus, expectedOutput);
    });
});
