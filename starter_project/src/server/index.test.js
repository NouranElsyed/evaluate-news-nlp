
import request from 'supertest';
import app from './index';

let server;

beforeAll(async () => {

  server = app.listen(8001, () => {
    console.log('Server running on http://localhost:8001');
  });
});

afterAll((done) => {

  server.close(done);
});

test('POST /sentiment - Success', async () => {
  const response = await request(app)
    .post('/sentiment')
    .send({ url: 'https://bbc.com' });

  expect(response.statusCode).toBe(200);
});

test('POST /sentiment - Missing URL', async () => {
  const response = await request(app)
    .post('/sentiment')
    .send({});

  expect(response.statusCode).toBe(400);
});
