const { Op } = require('sequelize');
const { userModule } = require('../models/user');

const { groupModule } = require('../../group/models/group');

userModule.belongsToMany(groupModule, { through: 'UserGroup' });

const createUser = async (userData) => {
  try {
    const {
      id,
      login,
      password,
      age,
      isDeleted: deleted,
    } = userData;

    const result = await userModule.create(
      {
        id,
        login,
        password,
        age,
        deleted,
      },
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const getAllUsers = async () => {
  try {
    const result = await userModule.findAll({
      attributes: ['id', 'login', 'age'],
      where: {
        deleted: false,
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
};

const getUserById = async (id) => {
  try {
    const result = await userModule.findAll({
      attributes: ['id', 'login', 'age'],
      where: {
        id,
        deleted: false,
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
};

const getUsersBySubstringAndLimit = async (querry) => {
  try {
    const { limit, loginSubstring } = querry;
    const result = await userModule.findAll({
      attributes: ['id', 'login', 'age'],
      limit,
      where: {
        login: { [Op.iLike]: `%${loginSubstring}%` },
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
};

const deleteUser = async (id) => {
  try {
    const result = await userModule.update({ deleted: true }, { where: { id } });
    return { result };
  } catch (error) {
    return { error };
  }
};

const updateUser = async (userData) => {
  try {
    const result = await userModule.update(
      {
        login: `${userData.login}`,
        password: `${userData.password}`,
        age: `${userData.age}`,
        deleted: `${userData.isDeleted}`,
      }, { where: { id: `${userData.id}` } },
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const getUserByLoginAndPassword = async (login, password) => {
  try {
    const result = await userModule.findAll({
      attributes: ['id', 'login', 'age'],
      where: {
        login,
        password,
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUsersBySubstringAndLimit,
  getUserByLoginAndPassword,
};
