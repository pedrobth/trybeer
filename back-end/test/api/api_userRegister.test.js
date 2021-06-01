require('dotenv').config();
const connection = require('./tstHelper/connection');
const frisby = require('frisby');

describe('register POST route', () => {
  const USERS = [{
    name: 'Pedro Risso',
    email: 'prisso@gmail.com',
    password: '1234567',
    isSeller: true,
  }, {
    name: 'Risso',
    email: 'risso@domain.com',
    password: '123test',
    isSeller: false,
  }];

  const URL = 'http://localhost:3001/register';

  beforeEach(async (done) => {
    await connection.execute('DELETE FROM sales_products');
    await connection.execute('DELETE FROM sales');
    await connection.execute('DELETE FROM users');
    // await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
    // await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
    done();
  });

  afterAll(async done => {
    connection.end();
    done();
  });

  it('Check user registration', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        name: USERS[1].name,
        password: USERS[1].password,
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 201);
  });
  it('Check user re-registration attempt', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        name: USERS[1].name,
        password: USERS[1].password,
        isSeller: USERS[1].isSeller,
      });
    await frisby
      .post(URL, {
        email: USERS[1].email,email: USERS[1].email,
        name: USERS[1].name,
        isSeller: USERS[1].isSeller,
        password: 'ranD0mp@$$worD',
      })
      .expect('status', 409)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('Email already registered');
      });
  });
  it('Check user registration with email missing', async () => {
    await frisby
      .post(URL, {
        name: USERS[1].name,
        password: USERS[1].password,
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
  it('Check user registration with an empty email', async () => {
    await frisby
      .post(URL, {
        email: '',
        name: USERS[1].name,
        password: USERS[1].password,
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
  it('Check user registration with name missing', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        password: USERS[1].password,
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
  it('Check user registration with an empty name', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        name: '',
        password: USERS[1].password,
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
  it('Check user registration with password missing', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        name: USERS[1].name,
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
  it('Check user registration with an empty password', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        name: USERS[1].name,
        password: '',
        isSeller: USERS[1].isSeller,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
  it('Check user registration with role (isSeller) missing', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        name: USERS[1].name,
        password: USERS[1].password,
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsed = JSON.parse(body);
        expect(parsed.message).toBe('All fields must be filled');
      });
  });
});
