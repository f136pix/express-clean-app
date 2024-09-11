import Joi from "joi";

export const createItemSchema = Joi.object().keys({
    name: Joi.string().required(),
    userId: Joi.number()
});

