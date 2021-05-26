const Joi = require("joi");

const groupShema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string())
});

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

module.exports = {
    group,
};