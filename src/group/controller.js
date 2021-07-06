const express = require('express');

const ValidationService = require("./services/validation");
const GroupService = require("./data-access/group.db");

const groupsRouter = express.Router();

const getGroupById = async (req, res, next) => {
    const { id } = req.params;
    const { error, result } = await GroupService.getGroupById(id);
    if (error) {
        next({ msg: error })
        return;
    }
    res.status(200).send(result);
    return;
};
groupsRouter.get('/:id', getGroupById)

const createGroup = async (req, res, next) => {
    const {
        body: newGroup,
    } = req;
    const validationError = await ValidationService.group(newGroup);
    if (validationError) {
        next({ msg: validationError, code: 400 })
        return;
    }
    const { error, result } = await GroupService.createGroup(newGroup);
    if (error) {
        next({ msg: error })
        return;
    }
    res.status(201).send(result);
    return;
};
groupsRouter.post('/', createGroup)

const getAllGroups = async (req, res, next) => {
    const { error, result } = await GroupService.getAllGroups();
    if (error) {
        next({ msg: error })
        return;
    }
    res.status(200).send(result);
    return;
};
groupsRouter.get('/', getAllGroups)

const deleteGroupById = async (req, res, next) => {
    const { id } = req.params;
    const { error, result } = await GroupService.deleteGroup(id);
    if (error) {
        next({ msg: error })
        return;
    }
    res.status(200).send(result);
    return;
};
groupsRouter.delete('/:id', deleteGroupById)

const putGroup = async (req, re, next) => {
    const {
        body: newGroup,
    } = req;
    const validationError = await ValidationService.group(newGroup);
    if (validationError) {
        next({ msg: validationError, code: 400 })
        return;
    }

    const { error, result } = await GroupService.updateGroup(newGroup);
    if (error) {
        next({ msg: error })
        return;
    }
    res.status(201).send(result);
    return;
};
groupsRouter.put('/', putGroup)

const addUsersToGroup = async (req, res, next) => {
    const { body, body: { usersIds } } = req;
    const { id: groupId } = req.params
    const validationError = await ValidationService.usersToGroup(body)
    if (validationError) {
        next({ msg: validationError, code: 400 })
        return;
    }
    const { error, result } = await GroupService.addUsersToGroup(groupId, usersIds)
    if (error) {
        next({ msg: error })
        return;
    }
    res.status(201).send(result);
    return
}
groupsRouter.post('/:id/users', addUsersToGroup)

module.exports = groupsRouter;


