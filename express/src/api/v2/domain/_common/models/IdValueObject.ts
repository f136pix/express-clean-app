export abstract class IVO<T> {
    protected _value: T;

    constructor(value: T) {
        this._value = value;
    }

    public getValue(): T {
        return this._value;
    }
}