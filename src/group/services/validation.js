const Joi = require('joi');

const groupShema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()),
});

const requestBodySchema = Joi.object({
  usersIds: Joi.array().required().min(1),
});

const validationOpt = {
  abortEarly: false,
};

const group = (groupToValidate) => {
  const { error } = groupShema.validate(groupToValidate, validationOpt);
  if (error) {
    return error.details.reduce((msgs, er) => {
      msgs.push(er.message);
      return msgs;
    }, []);
  }
};

const usersToGroup = (reqestBodyToValidate) => {
  const { error } = requestBodySchema.validate(reqestBodyToValidate, validationOpt);
  if (error) {
    return error.details.reduce((msgs, er) => {
      msgs.push(er.message);
      return msgs;
    }, []);
  }
};

module.exports = {
  group, usersToGroup,
};
