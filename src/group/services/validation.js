const Joi = require("joi");

const groupShema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string())
});

const requestBody = Joi.object({
    usersIds: Joi.array().required(),
    groupId: Joi.string().required()
})

const validationOpt = {
    abortEarly: false,
};

const group = (groupToValidate) => {
    const { error } = groupShema.validate(groupToValidate, validationOpt);
    if (error) {
        return error.details.reduce((msgs, error) => {
            msgs.push(error.message);
            return msgs;
        }, []);
    }
    return;
};

const usersToGroup = (reqestBodyToValidate) => {
    const { error } = requestBody.validate(reqestBodyToValidate, validationOpt)
    if (error) {
        return error.details.reduce((msgs, error) => {
            msgs.push(error.message);
            return msgs;
        }, []);
    }
    return;
}

module.exports = {
    group, usersToGroup
};