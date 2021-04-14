const Joi = require('joi')

const userSchema = Joi.object({
    login: Joi.string().required(),
    id: Joi.number().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$")),
    age: Joi.number().min(3).max(130).required(),
    isDeleted: Joi.boolean()
})

module.exports={
    userSchema,
}