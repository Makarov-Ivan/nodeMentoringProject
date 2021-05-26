const { getUserById,
    createUser,
    gatAllUsers,
    putUser,
    deleteUserById,
} = require('./user/controller')

const {getGroupById, deleteGroupById, getAllGroups, createGroup, putGroup} = require('./group/controller')

const {addUsersToGroup} = require('./userToGroup/controller')

module.exports={
    getUserById,
    createUser,
    gatAllUsers,
    putUser,
    deleteUserById,
    
    getGroupById,
    deleteGroupById,
    getAllGroups,
    createGroup,
    putGroup,

    addUsersToGroup
}