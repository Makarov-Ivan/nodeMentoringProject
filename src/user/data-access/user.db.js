const { userModule } = require("../models/user");

const createUser = async (userData) => {
    try {
        const {
            id: uid,
            login: uLogin,
            password: uPassword,
            age: uAge,
            isDeleted: uDeleted,
        } = userData;

        const result = await userModule.create(
            {
                uid,
                uLogin,
                uPassword,
                uAge,
                uDeleted,
            }
        );
        return { result };
    } catch (error) {
        return { error };
    }
};

const getAllUsers = async () => {
    try {
        const result = await userModule.findAll({
            // attributes: ["uid", "uLogin",[ "uAge", 'id'], 'login', 'age'],
            attributes: ["uid", "uLogin", "uAge"],
            where: {
                "uDeleted": false
            }
        });
        return { result };
    } catch (error) {
        return { error };
    }
};

const getUserById = async (id) => {
    try {
        const result = await userModule.findAll({
            attributes: ["uid", "uLogin", "uAge"],
            where: {
                "uid": id,
                "uDeleted": false,
            }
        });
        return { result };
    } catch (error) {
        return { error };
    }
};
const deleteUser = async (id) => {
    try {
        const result = await userModule.update({ "uDeleted": true }, { where: { "uid": id } });
        return { result };
    } catch (error) {
        return { error };
    }
};

const updateUser = async (userData) => {
    try {
        const result = await userModule.update(
            {
                "uLogin": `${userData.login}`,
                "uPassword": `${userData.password}`,
                "uAge": `${userData.age}`,
                "uDeleted": `${userData.isDeleted}`
            }, { where: { "uid": `${userData.id}` } });
        return { result };
    } catch (error) {
        return { error };
    }
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser, updateUser };