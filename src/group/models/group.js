const { DataTypes } = require('sequelize');

const { sequelizeClient } = require('../../../DB_connection/connection');

const Group = sequelizeClient.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  permissions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {});

module.exports = {
  groupModule: Group,
};
