import {UserResponse} from "./UserReponse";

export type RegisterUserResponse = { 
    user : UserResponse,
    jwt : string
}