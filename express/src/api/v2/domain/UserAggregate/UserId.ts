import {IVO} from "../_common/models/IdValueObject";

export class UserId extends IVO<number>{

    private constructor(id: number) {
        super(id);
    }

    public static createNew(): UserId {
        return new UserId(Math.floor(Math.random() * 10000));
    }

    public static toUserId (id: number) {
        return new UserId(id);
    }
}