/**
 * pub sub
 * todo add promises
 */
class PubSub {
    _subscribers = [];
    constructor() {
        this._subscribers = [];
    }
    
    subscribe(caller) {
        this._subscribers.push(caller);
    }
    
    send(event) {        
        this._subscribers.map(subscriber => subscriber.onMessage(event));
    }
}

exports.PubSub = new PubSub();

