const { createToken } = require('../../../src/login/services/jwt');

const testUser = require('./testNPA');

module.exports = () => createToken(testUser.login, testUser.password);
