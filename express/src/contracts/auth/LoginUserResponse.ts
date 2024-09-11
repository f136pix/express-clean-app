import {UserResponse} from "./UserReponse";

export type LoginUserResponse = {
    user : UserResponse,
    jwt : string
}