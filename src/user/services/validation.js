const Joi = require("joi");

const userSchema = Joi.object({
    login: Joi.string().required(),
    id: Joi.number().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,15}$")),
    age: Joi.number().min(4).max(140).required(),
    isDeleted: Joi.boolean()
});

const validationOpt = {
    abortEarly: false,
};

const user = (userToValidate) => {
    const { error } = userSchema.validate(userToValidate, validationOpt);
    if (error) {
        return error.details.reduce((msgs, error) => {
            msgs.push(error.message);
            return msgs;
        }, []);
    }
    return;
};

module.exports = {
    user,
};