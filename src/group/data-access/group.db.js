const { Op } = require('sequelize');
const { groupModule } = require("../models/group");

const createGroup = async (groupData) => {
    try {
        const result = await groupModule.create(
            {
                ...groupData
            }
        );
        return { result };
    } catch (error) {
        return { error };
    }
};

const getAllGroups = async () => {
    try {
        const result = await groupModule.findAll({
            attributes: ["id", "name", "permissions"],
        });
        return { result };
    } catch (error) {
        return { error };
    }
};

const getGroupById = async (id) => {
    try {
        const result = await groupModule.findAll({
            attributes: ["id", "name", "permissions"],
            where: {
                "id": id,
            }
        });
        return { result };
    } catch (error) {
        return { error };
    }
};

const deleteGroup = async (id) => {
    try {
        const result = await groupModule.destroy({ where: { "id": id } });
        return { result: [result] };
    } catch (error) {
        return { error };
    }
};

const updateGroup = async (groupData) => {
    try {
        const result = await groupModule.update(
            {
                "name": `${groupData.name}`,
                "permissions": `${groupData.permissions}`
            }, { where: { "id": `${groupData.id}` } });
        return { result };
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
};