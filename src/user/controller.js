const R = require("ramda");
const ValidationService = require("./services/validation");

const dbMock = [
    {
        id: 1,
        login: "user1",
        password: "password1",
        age: 25,
        isDeleted: false
    },
    {
        id: 2,
        login: "user2",
        password: "password2",
        age: 26,
        isDeleted: false
    },
    {
        id: 12,
        login: "user12",
        password: "Password12",
        age: 26,
        isDeleted: false
    }
];

const filetrUsersById = (id) => R.find(R.propEq("id", Number(id)), dbMock);
const filterSubstring = val => R.filter(({ login }) => R.includes(val)(login), dbMock);
const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];
const getUserIndexInDB = (id) => {
    return R.findIndex(R.propEq("id", Number(id)))(dbMock);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const response = filetrUsersById(id);
    if (response) {
        res.status(200).send(response);
        return;
    }
    res.status(500).send("error");
    return;
};

const getAutoSuggestUsers = async (req, res) => {
    const { limit, substring } = req.query;
    const selectedusers = filterSubstring(substring);
    const chunks = chunk(selectedusers, limit);
    res.status(200).send(chunks);
};

const createUser = async (req, res) => {
    const {
        body: newUser,
        body: { id }
    } = req;

    const validationError = await ValidationService.user(newUser);
    console.log({validationError});
    if (validationError) {
        res.status(400).send(validationError);
        return;
    }
    const ifUserExist = !!filetrUsersById(id);
    if (ifUserExist) {
        const userIndexInArray = getUserIndexInDB(id);
        dbMock[userIndexInArray] = R.mergeDeepLeft(newUser, dbMock[userIndexInArray]);
    } else {
        dbMock.push(newUser);
    }
    res.status(200).send();
    return;
};

const gatAllUsers = async (req, res) => {
console.log("request is catched!");
    res.status(200).send(dbMock);
    return;
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const ifUserExist = !!filetrUsersById(id);
    if (ifUserExist) {
        const userIndexInArray = getUserIndexInDB(id);
        dbMock[userIndexInArray].isDeleted = true;
        res.status(200).send("user deleted");
        return;
    } else {
        res.status(404).send("user dosn't exist");
        return;
    }
};


const putUser = async (req, res) => {
    const {
        body: newUser,
        body: { id }
    } = req;
    const ifUserExist = !!filetrUsersById(id);
    if (ifUserExist) {
        const userIndexInArray = getUserIndexInDB(id);
        dbMock[userIndexInArray] = R.mergeDeepLeft(newUser, dbMock[userIndexInArray]);

    } else {
        dbMock.push(newUser);
    }
    res.status(201).send();
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


