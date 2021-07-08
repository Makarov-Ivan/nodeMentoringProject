const Joi = require('joi');

const validationOpt = {
  abortEarly: false,
};

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const user = (userToValidate) => {
  const { error } = userSchema.validate(userToValidate, validationOpt);
  if (error) {
    return error.details.reduce((msgs, er) => {
      msgs.push(er.message);
      return msgs;
    }, []);
  }
};

module.exports = { user };
