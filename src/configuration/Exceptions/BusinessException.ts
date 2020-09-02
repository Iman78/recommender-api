export class BusinessException extends Error{
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BusinessException.prototype);
    }
}