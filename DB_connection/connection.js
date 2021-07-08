const { Sequelize } = require('sequelize');

const { dbConfig } = require('../config');

const sequelizeClient = new Sequelize(dbConfig.url, { logging: false });

module.exports = {
  sequelizeClient,
};
