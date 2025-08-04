import Joi from 'joi';


export const PostDtoSchema = Joi.object({
    id: Joi.number().min(1).max(1000),
    userId: Joi.number().min(1).max(200),
    title: Joi.string(),
    text: Joi.string()
})