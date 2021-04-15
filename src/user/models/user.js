const { DataTypes } = require("sequelize");

const { sequelizeClient } = require("../data-access/connection");

const User = sequelizeClient.define("User", {
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  uLogin: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  uPassword: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  uAge: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  uDeleted: {
    type: DataTypes.BOOLEAN,
  }
}, {});

// (async () => {
//   await sequelizeClient.sync({ force: true });
//   // Code here
// })();


module.exports = {
  userModule: User,
};