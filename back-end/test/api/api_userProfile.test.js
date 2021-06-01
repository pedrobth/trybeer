const frisby = require('frisby');
const connection = require('./tstHelper/connection');


describe('PUT into profile route', () => {
    const USER = {
        name: 'Guilherme Almeida',
        email: 'almeida_guilherme204@gmail.com',
        password: '1234567',
        role: 'client'
    }

    const { name, email, password, role } = USER;
    const URL = 'http://localhost:3001/profile'
    const URL_LOGIN = 'http://localhost:3001/login'
    beforeEach(async (done) => {
        await connection.execute('DELETE FROM sales_products');
        await connection.execute('DELETE FROM sales');
        await connection.execute('DELETE FROM users');
        await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
        await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
        await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
        await connection.execute('INSERT INTO users (name,email,password,role)'
            + 'VALUES (?,?,?,?)', [name, email, password, role])
        done();
    });

    afterEach(async (done) => {
        await connection.execute('DELETE FROM users');
        done();
    });

    afterAll(async done => {
        connection.end();
        done();
        }); 
    it('Checks whether to update the profile name', async () => {
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
                }).put(URL, {
                    name: 'Guilherme de Souza'
                })
                    .expect('status', 201)
                    .then((responseUpdate) => {
                        const { json } = responseUpdate;
                        expect(json.message.name).toBe('Guilherme de Souza')
                    })
            })
    })
    it('Checks that if you do not update the profile name, house has less than 12 characters', async () => {
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
                }).put(URL, {
                    name: 'Guilherme'
                })
                    .expect('status', 400)
                    .then((responseUpdate) => {
                        const { json } = responseUpdate;
                        expect(json.message).toBe('Invalid entries. Try again.')
                    })
            })
    })
});