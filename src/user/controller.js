const express = require('express');

const ValidationService = require('./services/validation');
const UserService = require('./data-access/user.db');

const usersRouter = express.Router();

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const { error, result } = await UserService.getUserById(id);
  if (error) {
    next({ msg: error });
    return;
  }
  res.status(200).send(result);
};
usersRouter.get('/:id', getUserById);

const createUser = async (req, res, next) => {
  const {
    body: newUser,
  } = req;

  const validationError = await ValidationService.user(newUser);
  if (validationError) {
    next({ code: 400, msg: validationError });
    return;
  }
  const { error, result } = await UserService.createUser(newUser);
  if (error) {
    next({ msg: error });
    return;
  }
  res.status(201).send(result);
};
usersRouter.post('/', createUser);

const gatAllUsers = async (req, res, next) => {
  const { query: querryObject } = req;
  if (Object.keys(querryObject).length) {
    const validationError = await ValidationService.querry(querryObject);
    if (validationError) {
      next({ msg: validationError, code: 400 });
      return;
    }
    const { error, result } = await UserService.getUsersBySubstringAndLimit(querryObject);
    if (error) {
      next({ msg: error });
      return;
    }
    res.status(200).send(result);
    return;
  }
  const { error, result } = await UserService.getAllUsers();
  if (error) {
    next({ msg: error });
    return;
  }
  res.status(200).send(result);
};
usersRouter.get('/', gatAllUsers);

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const { error, result } = await UserService.deleteUser(id);
  if (error) {
    next({ msg: error });
    return;
  }
  res.status(200).send(result);
};
usersRouter.delete('/:id', deleteUserById);

const putUser = async (req, res, next) => {
  const {
    body: newUser,
  } = req;

  const validationError = await ValidationService.user(newUser);
  if (validationError) {
    next({ msg: validationError, code: 400 });
    return;
  }

  const { error, result } = await UserService.updateUser(newUser);
  if (error) {
    next({ msg: error });
    return;
  }
  res.status(201).send(result);
};
usersRouter.put('/', putUser);

module.exports = usersRouter;
