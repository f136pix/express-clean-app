import { Router } from 'express';
import authController from './auth/authController';
import {errorHandler} from "./_common/middlewares/errorHandler";

const v1Router = Router();

v1Router.use('/auth', authController);
v1Router.use(errorHandler);

export default v1Router;
