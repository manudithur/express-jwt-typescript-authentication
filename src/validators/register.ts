import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const registerValidatorSchema = Joi.object({
    role: Joi.string().required(),

    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), // Assuming a minimum password length of 6 characters

    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required(),
    }).required(),

    phoneNumber: Joi.string().pattern(new RegExp('^[+]?[0-9]{1,15}$')).required(), // Simplified regex for phone numbers

    address: Joi.object({
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zip: Joi.string().required(),
    }).required(),
});

const registerValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerValidatorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};



export default registerValidator;
