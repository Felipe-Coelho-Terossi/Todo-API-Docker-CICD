const request = require('supertest');
const app = require('../src/index');
const { pool, init } = require('../src/db');

beforeAll(() => init);
afterAll(() => pool.end());

describe('GET /todos', () => {
  it('retorna array', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /todos', () => {
  it('cria uma tarefa', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Estudar Docker' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Estudar Docker');
  });
});