const { getUserById,
    createUser,
    gatAllUsers,
    putUser,
    deleteUserById,
} = require('./user/controller')

const groupController = require('./group/controller')

module.exports = {
    getUserById,
    createUser,
    gatAllUsers,
    putUser,
    deleteUserById,

    ...groupController,
}