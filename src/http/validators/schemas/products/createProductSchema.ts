import { ICreateProductDTO } from '@domains/dtos/products/ICreateProducts';
import * as Joi from 'joi';

export const CreateProductSchema = Joi.object<ICreateProductDTO>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
});
