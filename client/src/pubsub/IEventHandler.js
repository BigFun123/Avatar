export class IEventHandler {
    constructor() {
        if (new.target === IEventHandler) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    onMessage(event) {
        throw new TypeError("Must override method");
    }
}