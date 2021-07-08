const { groupModule } = require('../models/group');

const { userModule } = require('../../user/models/user');

groupModule.belongsToMany(userModule, { through: 'UserGroup' });

const createGroup = async (groupData) => {
  try {
    const result = await groupModule.create(
      {
        ...groupData,
      },
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const getAllGroups = async () => {
  try {
    const result = await groupModule.findAll({
      attributes: ['id', 'name', 'permissions'],
    });
    return { result };
  } catch (error) {
    return { error };
  }
};

const getGroupById = async (id) => {
  try {
    const result = await groupModule.findAll({
      attributes: ['id', 'name', 'permissions'],
      where: {
        id,
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
};

const deleteGroup = async (id) => {
  try {
    const result = await groupModule.destroy({ where: { id } });
    return { result: [result] };
  } catch (error) {
    return { error };
  }
};

const updateGroup = async (groupData) => {
  try {
    const result = await groupModule.update(
      {
        name: `${groupData.name}`,
        permissions: `${groupData.permissions}`,
      }, { where: { id: `${groupData.id}` } },
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const addUsersToGroup = async (groupId, usersIds) => {
  try {
    const users = await Promise.all(usersIds.map(async (userId) => {
      await userModule.findByPk(userId);
    }));
    const group = await groupModule.findByPk(groupId);
    if (group == null) {
      throw new Error(`group with ${groupId} doesn't exist`);
    } else {
      const result = await group.addUsers(users);
      return { result };
    }
  } catch (error) {
    return { error };
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  deleteGroup,
  updateGroup,
  addUsersToGroup,
};
