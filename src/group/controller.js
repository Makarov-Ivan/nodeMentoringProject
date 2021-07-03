const express = require('express');

const ValidationService = require("./services/validation");
const GroupService = require("./data-access/group.db");

const groupsController = express.Router();

const getGroupById = async (req, res) => {
    const { id } = req.params;
    const { error, result } = await GroupService.getGroupById(id);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(200).send(result);
    return;
};
groupsController.get('/:id', getGroupById)

const createGroup = async (req, res) => {
    const {
        body: newGroup,
    } = req;
    // console.log(req)
    const validationError = await ValidationService.group(newGroup);
    if (validationError) {
        res.status(400).send(validationError);
        return;
    }
    const { error, result } = await GroupService.createGroup(newGroup);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(201).send(result);
    return;
};
groupsController.post('/', createGroup)

const getAllGroups = async (req, res) => {
    const { error, result } = await GroupService.getAllGroups();
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(200).send(result);
    return;
};
groupsController.get('/', getAllGroups)

const deleteGroupById = async (req, res) => {
    const { id } = req.params;
    const { error, result } = await GroupService.deleteGroup(id);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(200).send(result);
    return;
};
groupsController.delete('/:id', deleteGroupById)

const putGroup = async (req, res) => {
    const {
        body: newGroup,
    } = req;
    const validationError = await ValidationService.group(newGroup);
    if (validationError) {
        res.status(400).send(validationError);
        return;
    }

    const { error, result } = await GroupService.updateGroup(newGroup);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(201).send(result);
    return;
};
groupsController.put('/', putGroup)

const addUsersToGroup = async (req, res) => {
    const { body, body: { usersIds } } = req;
    const { id: groupId } = req.params
    const validationError = await ValidationService.usersToGroup(body)
    if (validationError) {
        res.status(400).send(validationError);
        return;
    }
    const { error, result } = await GroupService.addUsersToGroup(groupId, usersIds)
    if (error) {
        res.status(500).send(error.message);
        return;
    }
    res.status(201).send(result);
    return
}
groupsController.post('/:id/users', addUsersToGroup)

module.exports = {

    groupsController
};


