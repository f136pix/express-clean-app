import {IVO} from "../../_common/models/IdValueObject";

export class UserId extends IVO<number>{

    private constructor() {
        super(Math.floor(Math.random() * 10000));
    }

    public static createNew(): UserId {
        return new UserId()
    }
}