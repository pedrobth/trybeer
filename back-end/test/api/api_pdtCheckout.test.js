require('dotenv').config();
const jwt = require('jsonwebtoken');
const frisby = require('frisby');
const connection = require('./tstHelper/connection');

describe('checkout POST route', () => {
  const USERS = [
  { name: 'Risso',
    email: 'risso@domain.com',
    password: '123456test',
    role: 'client' },
  ];

  const URL = 'http://localhost:3001/checkout';
  const LOGIN_URL = 'http://localhost:3001/login';

  beforeEach(async (done) => {
    await connection.execute('DELETE FROM sales_products');
    await connection.execute('DELETE FROM products');
    await connection.execute('DELETE FROM sales');
    await connection.execute('DELETE FROM users');
    await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO users (name, email, password, role) ' 
      + 'VALUES (?, ?, ?, ?)',
      [USERS[0].name, USERS[0].email, USERS[0].password, USERS[0].role]);
    await connection.execute('INSERT INTO products (id, name, price, url_image) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
      ['1', 'Skol Lata 250ml', '2.20', 'http://localhost:3001/images/Skol Lata 350ml.jpg',
    '2', 'Heineken 600ml', '7.50', 'http://localhost:3001/images/Heineken 600ml.jpg',
    '3', 'Antarctica Pilsen 300ml', '2.49', 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg',
    '4', 'Brahma 600ml', '7.50', 'http://localhost:3001/images/Brahma 600ml.jpg']);
    done();
  });

  afterEach(async (done) => {
    await connection.execute('DELETE FROM sales_products');
    await connection.execute('DELETE FROM sales');
    await connection.execute('DELETE FROM users');
    await connection.execute('DELETE FROM products');
    done();
  });

  afterAll(async done => {
    connection.end();
    done();
  });

  it('Check sale insertion via api', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'Av. Atlantica',
          houseNumber: '2',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 201)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message.insertId).toBeGreaterThanOrEqual(1)
      })
    });
  });
  it('Check sale insertion without a street', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          houseNumber: '2',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion without an empty street', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av',
          houseNumber: '2',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion without a house number', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av atlantica',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion with an empty house number', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av atlantica',
          houseNumber: '',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion without a product id', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av atlantica',
          houseNumber: '2',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion with an empty product id', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av atlantica',
          houseNumber: '',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '',
            quantity: '2',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion without a product quantity', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av atlantica',
          houseNumber: '2',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
  it('Check sale insertion with an empty product quantity', async () => {
    await frisby.post(LOGIN_URL, {
      email: USERS[0].email,
      password: USERS[0].password,
    })
    .then((resp) => {
      const { body } = resp;
      const parsedBody = JSON.parse(body);
      const { token } = parsedBody.message;
      return frisby.setup({
        request: { headers: { 'authorization': token } }
      })
        .post(URL, {
          street: 'av atlantica',
          houseNumber: '',
          cart: [{
            id: '2',
            quantity: '2',
            price: '7.50',
            name: 'Heineken 600ml'
          }, {
            id: '4',
            quantity: '',
            price: '7.50',
            name: 'Brahma 600ml'
          }],
      })
      .expect('status', 400)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(parsedBody.message).toBe('All fields must be filled')
      })
    });
  })
})

