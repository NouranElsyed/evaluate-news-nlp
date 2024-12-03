// import request from '../../node_modules/supertest/index.js'; 
// import app from './index.js';
// global.import = { meta: { url: 'mocked_url' } };
// const request = require('../../node_modules/supertest/index.js');
// const app = require('./index.js');

// describe('API Server Tests', () => {


//     test('POST /sentiment - Success', async () => {
//         const response = await request(app)
//             .post('/sentiment')
//             .send({ url: 'https://bbc.com' });

//         expect(response.statusCode).toBe(200);
//         expect(response.body.message).toBe('Success');
//         expect(response.body.data.url).toBe('https://bbc.com');
//     });

//     test('POST /sentiment - Missing URL', async () => {
//         const response = await request(app)
//             .post('/sentiment')
//             .send({});

//         expect(response.statusCode).toBe(400);
//         expect(response.body.message).toBe('URL is required');
//     });

// });

//////////////////////////////////////////////
// import app from './index';  


// let server;

// beforeAll(() => {
//   // بدء الخادم قبل جميع الاختبارات
//   server = app.listen(8000, () => {
//     console.log('Server running on http://localhost:8000');
//   });
// });

// afterAll(() => {
//   // إيقاف الخادم بعد جميع الاختبارات
//   server.close();
// });
// describe('API Server Tests', () => {
//   test('POST /sentiment - Success', async () => {
//     const response = await request(app)
//       .post('/sentiment')
//       .send({ url: 'https://bbc.com' });

//     expect(response.statusCode).toBe(200);
//   });

//   test('POST /sentiment - Missing URL', async () => {
//     const response = await request(app)
//       .post('/sentiment')
//       .send({});

//     expect(response.statusCode).toBe(400);
//   });
// });
//////////////////////////////////////
import request from 'supertest';
import app from './index';

let server;

beforeAll(async () => {
  // تغيير المنفذ إلى 8001 لتجنب الصراع
  server = app.listen(8001, () => {
    console.log('Server running on http://localhost:8001');
  });
});

afterAll((done) => {
  // إيقاف الخادم بعد جميع الاختبارات
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
