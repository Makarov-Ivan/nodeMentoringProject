const ValidationService = require("./services/validation");

const UserService = require("./data-access/user.db");

const getUserById = async (req, res) => {
    const { id } = req.params;
    const { error, result } = await UserService.getUserById(id);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(201).send(result);
    return;
};

const getAutoSuggestUsers = async (req, res) => {
    res.status(500).send("not implemented yet");
};

const createUser = async (req, res) => {
    const {
        body: newUser,
    } = req;

    const validationError = await ValidationService.user(newUser);
    if (validationError) {
        res.status(400).send(validationError);
        return;
    }
    const { error, result } = await UserService.createUser(newUser);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(201).send(result);
    return;
};

const gatAllUsers = async (req, res) => {
    const { error, result } = await UserService.getAllUsers();
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(200).send(result);
    return;
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const { error, result } = await UserService.deleteUser(id);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(200).send(result);
    return;
};


const putUser = async (req, res) => {
    const {
        body: newUser,
    } = req;

    const validationError = await ValidationService.user(newUser);
    if (validationError) {
        res.status(400).send(validationError);
        return;
    }

    const { error, result } = await UserService.updateUser(newUser);
    if (error) {
        res.status(500).send(error);
        return;
    }
    res.status(201).send(result);
    return;
};

module.exports = {
    getUserById,
    createUser,
    gatAllUsers,
    putUser,
    deleteUserById,
    getAutoSuggestUsers
};


