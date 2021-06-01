const frisby = require('frisby');

const connection = require('./tstHelper/connection');


Date.prototype.addTime = function (time) {
    var time = time.split(":")
    var rd = new Date(this.setHours(this.getHours() + parseInt(time[0])))
    rd = new Date(rd.setMinutes(rd.getMinutes() + parseInt(time[1])))
    return new Date(rd.setSeconds(rd.getSeconds() + parseInt(time[2])))
}


describe('GET into orders route', () => {
    const USER = {
        name: 'Guilherme Almeida',
        email: 'almeida_guilherme204@gmail.com',
        password: '1234567',
        role: 'client'
    }
    const date = new Date(Date());

    const sale_date = JSON.stringify(date)
    const orders = [
        {
            id: 1,
            user_id: 1,
            total_price: "22.00",
            delivery_address: "almeida_guilherme204@gmail.com",
            delivery_number: "248",
            sale_date,
            status: "pendente"
        },
        {
            id: 2,
            user_id: 1,
            total_price: "75.00",
            delivery_address: "almeida_guilherme204@gmail.com",
            delivery_number: "248",
            sale_date,
            status: "pendente"
        }
    ]
    const { name, email, password, role } = USER;
    const URL = 'http://localhost:3001/orders'
    const URL_LOGIN = 'http://localhost:3001/login'
    beforeEach(async (done) => {
        await connection.execute('DELETE FROM sales_products');
        await connection.execute('DELETE FROM sales');
        await connection.execute('DELETE FROM users');
        await connection.execute('DELETE FROM products');
        await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
        await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
        await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
        await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
        const [user] = await connection.execute('INSERT INTO users (name,email,password,role)'
            + 'VALUES (?,?,?,?)', [name, email, password, role])
        const [saleInsertionRes] = await connection.execute('INSERT INTO sales (user_id,total_price,delivery_address,delivery_number,sale_date,status)'
            + 'VALUES(?,?,?,?,?,?),(?,?,?,?,?,?)', [user.insertId, 22, email, 248, date, 'pendente', user.insertId, 75, email, 248, date, 'pendente'])
        await connection.execute('INSERT INTO products (id, name, price, url_image) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
            ['1', 'Skol Lata 250ml', '2.20', 'http://localhost:3001/images/Skol Lata 350ml.jpg',
            '2', 'Heineken 600ml', '7.50', 'http://localhost:3001/images/Heineken 600ml.jpg',
            '3', 'Antarctica Pilsen 300ml', '2.49', 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg',
            '4', 'Brahma 600ml', '7.50', 'http://localhost:3001/images/Brahma 600ml.jpg']);
        await connection.execute('INSERT INTO sales_products (sale_id,product_id,quantity)'
            + 'VALUES(?,?,?),(?,?,?)', [saleInsertionRes.insertId, 2, 10, saleInsertionRes.insertId, 1, 10]);   
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

    it('Checks whether to return all customer orders', async () => {
        await frisby
            .post(URL_LOGIN, {
                email,
                password,
            })
            .then((response) => {
                const { json } = response;
                return frisby.setup({
                    request: {
                        headers: {
                            Authorization: json.message.token,
                            'Content-Type': 'application/json',
                        },
                    }
                }).get(URL)
                    .expect('status', 200)
                    .then((responseGet) => {
                        const { json } = responseGet;
                        json.message.forEach((item, index) => {
                            expect(`\"${item.sale_date}\"`).toBe(orders[index].sale_date)
                            expect(item.id).toBe(orders[index].id)
                            expect(item.user_id).toBe(orders[index].user_id)
                            expect(item.total_price).toBe(orders[index].total_price)
                            expect(item.delivery_address).toBe(orders[index].delivery_address)
                            expect(item.delivery_number).toBe(orders[index].delivery_number)
                            expect(item.status).toBe(orders[index].status)
                        })

                    })
            })
    })
})
//