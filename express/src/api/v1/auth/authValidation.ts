import Joi, { ObjectSchema } from "joi";

// const PASSWORD_REGEX = new RegExp(
// );

export const authSignup : Joi.ObjectSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password : Joi.string().required().min(6)
    // password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

export const authSignin = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const roleSchema = Joi.object().keys({
    role: Joi.string().required(),
})

