const request = require('supertest');
const app = require('../server');

describe('API 1: Car Value Calculation', () => {
    it('Should calculate car value for valid inputs (Sunny day scenario)', async () => {
        const response = await request(app)
            .post('/api/car-value')
            .send({ model: 'Civic', year: 2014 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 6614 });
    });
});
