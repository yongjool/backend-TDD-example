const request = require('supertest');
const app = require('../server');

test('TODO - empty api test', async () => {
    const response = await request(app).get('/api/quote');
    expect(response.status).toBe(200);
    expect(response.body).toEqual('test');
});
