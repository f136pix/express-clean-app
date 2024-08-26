import { Router } from 'express';
import authRouter from './auth/authRouter';
import {errorHandler} from "./_common/middlewares/errorHandler";

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use(errorHandler);

export default v1Router;
