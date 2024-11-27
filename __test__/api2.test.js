const request = require('supertest');
const app = require('../server');

describe('API 2: Convert Claim History to Risk Rating', () => {
    test('Valid input with query parameter', async () => {
        const response = await request(app).get('/api/risk-rating?claim_history=A%20crash%20and%20a%20bump%20happened%20last%20year.');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 2 });
    });

    test('Missing claim_history parameter', async () => {
        const response = await request(app).get('/api/risk-rating');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'claim_history is required' });
    });

    test('Valid input with all keywords', async () => {
        const response = await request(app).get('/api/risk-rating?claim_history=Collide,%20smash,%20crash,%20scratch,%20bump!');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 5 });
    });

    test('Valid input with no keywords', async () => {
        const response = await request(app).get('/api/risk-rating?claim_history=No%20incidents%20reported.');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 0 });
    });

    test('Empty claim_history parameter', async () => {
        const response = await request(app).get('/api/risk-rating?claim_history=');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'claim_history is required' });
    });
});
