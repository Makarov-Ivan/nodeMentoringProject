/* eslint-disable */
const request = require('supertest');

const getToken = require('./util/getJwtToken');
const userData = require('./util/userData');
const groupData = require('./util/groupData');

describe('functional tests', () => {
  let server;
  let token;
  beforeAll(() => {
    token = getToken();
  });
  beforeEach(() => {
    server = require('../../src/app');
  });
  describe('users', () => {
    it('should return 401 error if x-access-token header is not provided', async () => {
      await request(server)
        .get('/users')
        .expect(401);
    });
    it('should return 403 if x-access-token header is provided with invalid token', async () => {
      await request(server)
        .get('/users')
        .set('x-access-token', 'invalid')
        .expect(403);
    });
    it('should return 200 status when call a collection of users', async () => {
      await request(server)
        .get('/users')
        .set('x-access-token', token)
        .expect(200);
    });
    it('should return 200 status when call a curtain  user', async () => {
      await request(server)
        .get('/users/111')
        .set('x-access-token', token)
        .expect(200);
    });
    it('should return 201 status when post a user', async () => {
      await request(server)
        .post('/users')
        .send(userData)
        .set('x-access-token', token)
        .expect(201);
    });
    it('should return 500 status when post already existing user', async () => {
      await request(server)
        .post('/users')
        .send(userData)
        .set('x-access-token', token)
        .expect(500);
    });
    it('should return 201 status when apdate already existing user', async () => {
      userData.login += 'updated';
      await request(server)
        .put('/users')
        .send(userData)
        .set('x-access-token', token)
        .expect(201);
    });
    it('should return 200 status when delete an user', async () => {
      await request(server)
        .delete(`/users/${userData.id}`)
        .set('x-access-token', token)
        .expect(200);
    });
  });
  describe('groups', () => {
    it('should return 401 error if x-access-token header is not provided', async () => {
      await request(server)
        .get('/groups')
        .expect(401);
    });
    it('should return 403 if x-access-token header is provided with invalid token', async () => {
      await request(server)
        .get('/groups')
        .set('x-access-token', 'invalid')
        .expect(403);
    });
    it('should return 200 status when call a collection of groups', async () => {
      await request(server)
        .get('/groups')
        .set('x-access-token', token)
        .expect(200);
    });
    it('should return 200 status when call a curtain group', async () => {
      await request(server)
        .get('/groups/1')
        .set('x-access-token', token)
        .expect(200);
    });
    it('should return 201 status when post a group', async () => {
      const { name, id } = groupData;
      await request(server)
        .post('/groups')
        .send({ name, id })
        .set('x-access-token', token)
        .expect(201);
    });
    it('should return 500 status when post already existing group', async () => {
      await request(server)
        .post('/groups')
        .send(groupData)
        .set('x-access-token', token)
        .expect(500);
    });
    it('should return 201 status when apdate already existing group', async () => {
      groupData.name += 'updated';
      await request(server)
        .put('/groups')
        .send(groupData)
        .set('x-access-token', token)
        .expect(201);
    });
    it('should return 200 status when delete an group', async () => {
      await request(server)
        .delete(`/groups/${groupData.id}`)
        .set('x-access-token', token)
        .expect(200);
    });
  });
});
