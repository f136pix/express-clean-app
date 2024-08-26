import {Router} from 'express';
import {authService} from "./authService";
import {MessageResponse} from "../_common/interfaces";
import schemaValidator from "../_common/middlewares/schemaValidator";
import {authSignup} from "./authValidation";
import {CreateUserContract} from "../../../contracts/auth/CreateUser";

const authRouter = Router();

authRouter.post('/login', (req, res) => {
    res.send('Login route');
});

authRouter.post<CreateUserContract, any>('/register', schemaValidator(authSignup) , async (req, res) => {
    const ret = await authService.register(req.body)

});

authRouter.get<{}, any>("/test", (req, res, next) => {
        const ret = authService.test();

        const response: MessageResponse<string> = {
            message: 'OK',
            data: ret,
            status: 200
        };
        console.log(response);
        res.json(response);
})

export default authRouter;