import { Router } from 'express';

import {errorHandler} from "./_common/middlewares/errorHandler";
import authController from './auth/authController';
import itemsController from "./items/itemsController";

const v1Router = Router();

v1Router.use('/auth', authController);
v1Router.use('/items', itemsController);
v1Router.use(errorHandler);

export default v1Router;
