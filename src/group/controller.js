const ValidationService = require("./services/validation");

const GroupService = require("./data-access/group.db");

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

const createGroup = async (req, res) => {
    const {
        body: newGroup,
    } = req;

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

const getAllGroups = async (req, res) => {
    const { error, result } = await GroupService.getAllGroups();
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(200).send(result);
    return;
};

const deleteGroupById = async (req, res) => {
    const { id } = req.params;
    const { error, result } = await GroupService.deleteGroup(id);
    if (error) {
        res.status(500).send(error);
        return;
    }
    console.log({result, msg:'from router'})
    res.status(200).send(result);
    return;
};


const putGroup = async (req, res) => {
    const {
        body: newGroup,
    } = req;
    console.log({newGroup})
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

module.exports = {
    getGroupById,
    createGroup,
    getAllGroups,
    putGroup,
    deleteGroupById,
};


