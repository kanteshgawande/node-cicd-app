const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('returns HTTP 200 and the operational payload', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'CI/CD Pipeline Operational',
      version: '1.1.0'
    });
  });
});

describe('GET /health', () => {
  it('returns HTTP 200 and a healthy status with an ISO timestamp', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
    expect(response.body.timestamp).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false);
  });
});
