const frisby = require('frisby');

const connection = require('./tstHelper/connection');

describe('GET adm orders details', () => {
  const USERS = [{
    name: 'Pedro Risso',
    email: 'prisso@gmail.com',
    password: '1234567',
    role: 'administrator',
  },{
    name: 'Risso Pedro',
    email: 'rissop@risso.com',
    password: '1234567',
    role: 'client',
  },{
    name: 'Pedrobth',
    email: 'pedrobth@github.com',
    password: '1234567',
    role: 'client',
  }];
  // const date = new Date(Date());
  // const sale_date = JSON.stringify(date);
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const sale_date = month < 10
    ? `${date.getUTCFullYear()}-0${month}-${date.getUTCDate()}`
    : `${date.getUTCFullYear()}-${month}-${date.getUTCDate()}`
  const ORDERS = [{
    id: 1,
    user_id: 1,
    total_price: '119.00',
    delivery_address: 'Av. Atlantica',
    delivery_number: '2',
    sale_date,
    status: 'pendente',
  },{
    id: 2,
    user_id: 2,
    total_price: '829.30',
    delivery_address: 'Av. Vieira Souto',
    delivery_number: '456',
    sale_date,
    status: 'pendente',
  }];

  const salesProducts = {
    firstSale_id: 1, firstSaleProducts: [{ product_id: 2, quantity: 10 }, { product_id: 1, quantity: 20 }],
    secondSale_id: 2, secondSaleProducts: [
      { product_id: 1, quantity: '10' },
      { product_id: 2, quantity: '100' },
      { product_id: 3, quantity: '20' },
      { product_id: 4, quantity: '1' },
    ]
  };

  const URL = 'http://localhost:3001/admin/orders/2';
  const LOGIN_URL = 'http://localhost:3001/login';
  beforeEach(async (done) => {
    await connection.execute('DELETE FROM sales_products');
    await connection.execute('DELETE FROM sales');
    await connection.execute('DELETE FROM users');
    await connection.execute('DELETE FROM products');
    await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO users (name,email,password,role)'
        + 'VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?)', [
          USERS[0].name, USERS[0].email, USERS[0].password, USERS[0].role,
          USERS[1].name, USERS[1].email, USERS[1].password, USERS[1].role,
          USERS[2].name, USERS[2].email, USERS[2].password, USERS[2].role,
        ])
    await connection.execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)'
        + 'VALUES(?, ?, ?, ?, ?, ?),(?, ?, ?, ?, ?, ?)', [
          ORDERS[0].user_id,
          ORDERS[0].total_price,
          ORDERS[0].delivery_address,
          ORDERS[0].delivery_number,
          sale_date,
          ORDERS[0].status,
          ORDERS[1].user_id,
          ORDERS[1].total_price,
          ORDERS[1].delivery_address,
          ORDERS[1].delivery_number,
          sale_date,
          ORDERS[1].status,
        ]);
    await connection.execute('INSERT INTO products (id, name, price, url_image) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
        ['1', 'Skol Lata 250ml', '2.20', 'http://localhost:3001/images/Skol Lata 350ml.jpg',
        '2', 'Heineken 600ml', '7.50', 'http://localhost:3001/images/Heineken 600ml.jpg',
        '3', 'Antarctica Pilsen 300ml', '2.49', 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg',
        '4', 'Brahma 600ml', '7.50', 'http://localhost:3001/images/Brahma 600ml.jpg']);
    await connection.execute('INSERT INTO sales_products (sale_id,product_id,quantity)'
        + 'VALUES(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?)', [
          salesProducts.firstSale_id, salesProducts.firstSaleProducts[0].product_id, salesProducts.firstSaleProducts[0].quantity, //75
          salesProducts.firstSale_id, salesProducts.firstSaleProducts[1].product_id, salesProducts.firstSaleProducts[1].quantity, //44 -> 119
          salesProducts.secondSale_id, salesProducts.secondSaleProducts[0].product_id, salesProducts.secondSaleProducts[0].quantity, //22
          salesProducts.secondSale_id, salesProducts.secondSaleProducts[1].product_id, salesProducts.secondSaleProducts[1].quantity, //750
          salesProducts.secondSale_id, salesProducts.secondSaleProducts[2].product_id, salesProducts.secondSaleProducts[2].quantity, //49.8
          salesProducts.secondSale_id, salesProducts.secondSaleProducts[3].product_id, salesProducts.secondSaleProducts[3].quantity, // 7.5 -> 829.3
        ])
    done();
  })

  afterEach(async (done) => {
      await connection.execute('DELETE FROM sales_products');
      // await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
      await connection.execute('DELETE FROM sales');
      // await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
      await connection.execute('DELETE FROM products');
      // await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
      await connection.execute('DELETE FROM users');
      // await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
      done();
  })

  afterAll(async done => {
      connection.end();
      done();
      });

  it('check the returned values', async () =>{
    const loginRes = await frisby.post(LOGIN_URL, {email: USERS[0].email, password: USERS[0].password})
    const { token } = loginRes.json.message;
    await frisby.setup({
      request: {
        headers: {
            Authorization: token,
        },
      }
    }).get(URL).expect('status', 200)
      .then(resp => {
        const { json } = resp;
        json.forEach((item, index) => {
          expect(item.user_id).toBe(ORDERS[1].user_id)
          expect(item.total_price).toBe(ORDERS[1].total_price)
          expect(item.delivery_address).toBe(ORDERS[1].delivery_address)
          expect(item.delivery_number).toBe(ORDERS[1].delivery_number)
          expect(item.status).toBe(ORDERS[1].status)
          expect(item.product_id).toBe(salesProducts.secondSaleProducts[index].product_id)
          expect(`${item.sale_date}`).toContain(sale_date)
          expect(item.quantity).toBe(salesProducts.secondSaleProducts[index].quantity)
        })
      })
    })
  })
  