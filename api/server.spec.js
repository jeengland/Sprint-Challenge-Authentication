const request = require('supertest');

const server = require('./server.js');

const db = require('../database/dbConfig.js');

let token;

describe('server.js', () => {
    beforeAll(async () => {
        await db('users').truncate();
    });
    describe('registration', () => {
        let testResponse;
        it('returns an ID when you register a user', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .then((response) => {
                    testResponse = response;
                    expect(response.body.user[0]).toBe(1);
                })
        })   
        it ('returns a status code of 201', () => {
            expect(testResponse.status).toBe(201);
        })         
    }) 
    describe('login', () => {
        let testResponse;
        it('returns a status code of 200', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .then((response) => {
                    testResponse = response;
                    token = response.body.token;
                    expect(response.status).toBe(200);
                })
        })
        it('returns a message welcoming the user', () => {
            expect(testResponse.body.message).toBe('Welcome, test');
        })
    })
    describe('jokes', () => {
        it('should require authorization', () => {
            return request(server)
                .get('/api/jokes')
                .then((response) => {
                    expect(response.status).toBe(400);
                })
        }) 
        it('should return a list of 20 jokes', () => {
            return request(server)
                .get('/api/jokes')
                .set('Authorization', token)
                .then((response) => {
                    expect(response.body.length).toBe(20)
                    expect(response.body[0].joke).not.toBe(undefined)
                })
        })
    })
})