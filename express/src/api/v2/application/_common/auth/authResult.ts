import {User} from "../../../domain/UserAggregate/User";

export interface AuthResult {
    user: User;
    jwt: string;
}