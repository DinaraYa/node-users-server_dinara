import Joi from 'joi';
import {checkSchema, Location, Schema} from "express-validator";


export const PostDtoSchema = Joi.object({
    id: Joi.number().min(1).max(1000),
    userId: Joi.number().min(1).max(200),
    title: Joi.string(),
    text: Joi.string()
})


export const postValidationSchema = {
    id: {
        notEmpty: {
            errorMessage: 'ID is required'
        },
        isInt: {errorMessage: 'ID must be an integer'},
        isLength: {
            options: { min: 1, max: 4 },
            errorMessage: 'Length must be between 1 and 4 digits'
        },
    } ,
    userId: {
        notEmpty: {
            errorMessage: 'User ID is required'
        },
        isInt: {
            errorMessage: 'User ID must be an integer'
        },
        isLength: {
            options: { min: 1, max: 3 },
            errorMessage: 'Length must be between 1 and 3 digits'
        },
    } ,
    title: {
        notEmpty: {
            errorMessage: 'Title is required'
        },
        isLength: {
            options: { min: 1, max: 50 },
            errorMessage: 'Length must be between 1 and 50 characters'
        },
        isString: {
            errorMessage: 'Text must be a string',
        },
    },
    text: {
        notEmpty: {
            errorMessage: 'Text is required'
        },
        isLength: {
            options: { min: 1, max: 1000 },
            errorMessage: 'Length must be between 1 and 1000 characters'
        },
        isString: {
            errorMessage: 'Text must be a string',
        },
    },
}

export const postValidationIdSchema = {
    id: {
        in: ['params'] as Location[],
        notEmpty: { errorMessage: 'ID is required' },
        isInt: { errorMessage: 'ID must be an integer' },
        isLength: {
            options: { min: 1, max: 4 },
            errorMessage: 'Length must be between 1 and 4 digits'
        },
    }
};
