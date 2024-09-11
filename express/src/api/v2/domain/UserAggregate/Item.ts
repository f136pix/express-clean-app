import { User } from './User';

export class Item {
    private _id: number;
    private _name: string;
    private _user: User | null;
    private _createdAt: Date;

    constructor(id: number, name: string, user: User | null, createdAt: Date) {
        this._id = id;
        this._name = name;
        this._user = user;
        this._createdAt = createdAt;
    }

    public static create(name: string, user: User | null): Item {
        return new Item(Math.floor(Math.random() * 10000), name, user, new Date());
    }

    public assignUser(user: User): void {
        this._user = user;
    }
}