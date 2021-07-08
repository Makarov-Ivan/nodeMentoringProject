const express = require('express');

const ValidationService = require('./services/validation');
const jwtService = require('./services/jwt');
const { getUserByLoginAndPassword } = require('../user/data-access/user.db');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
  const validationError = await ValidationService.user(req.body);
  if (validationError) {
    next({ code: 400, msg: validationError });
    return;
  }
  const { login, password } = req.body;
  const { error, result } = await getUserByLoginAndPassword(login, password);
  if (error) {
    next({ msg: error });
    return;
  }
  if (!result.length) {
    next({ msg: 'user can\'t be found', code: 404 });
    return;
  }
  const userId = result[0].dataValues.id;
  const token = jwtService.createToken(userId, login);
  res.status(200).send(token);
});

loginRouter.get('/');

module.exports = loginRouter;
