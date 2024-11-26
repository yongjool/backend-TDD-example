const request = require('supertest'); //library for testing HTTP requests
const app = require('../server'); //import the server for testing, alows testing without having to start the server

describe('API 1: Car Value Calculation', () => {
    //describe is a jest function that groups tests, for organization and readability
    it('Should calculate car value for valid inputs (Sunny day scenario)', async () => {
        //it() defines an individual test case with two arguments: a string explaining what the test should do, and a function that performs the test
        const response = await request(app)
            .post('/api/car-value')
            .send({ model: 'Civic', year: 2014 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 6614 });
    });

    it('Should return an error for models with only numbers', async () => {
        const response = await request(app)
            .post('/api/car-value')
            .send({ model: '911', year: 2020 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid model' });
    });

    it('Should return an error for invalid year type', async () => {
        const response = await request(app)
            .post('/api/car-value')
            .send({ model: 'RAV4', year: 'twenty twenty' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid year' });
    });

    it('Should calculate car value for a single-character model', async () => {
        const response = await request(app)
            .post('/api/car-value')
            .send({ model: 'A', year: 2018 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 2118 });
    });

    it('Should return an error for null model and year', async () => {
        const response = await request(app)
            .post('/api/car-value')
            .send({ model: null, year: null });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid model or year' });
    });
});
