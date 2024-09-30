import {IQuery} from "../../_common/interfaces/IQuery";

export class LoginUserQuery implements IQuery {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}