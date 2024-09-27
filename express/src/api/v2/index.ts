import {Router} from "express";
import AuthController from "./infraestructure/auth/controllers/AuthController";
import {errorHandler} from "./infraestructure/_common/middlewares/errorHandler";

const v2Router = Router();

v2Router.use('/auth', AuthController.authRouter);
v2Router.use(errorHandler);

export default v2Router;
