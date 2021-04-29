const { DataTypes } = require("sequelize");

const { sequelizeClient } = require("../../../DB_connection/connection");

const User = sequelizeClient.define("User", {
  //rename attributes, delete id
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  login: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
  }
}, {});

module.exports = {
  userModule: User,
};