const { PubSub } = require("./pubsub/pubsub.js");
const { IEventHandler } = require("./pubsub/IEventHandler.js");
/**
 * Spinning cursor for waiting
 */
export class Spinner extends IEventHandler {
    constructor() {
        super();
        this.name = "Spinner";        
        document.getElementById("spinner").style.display = "none";
        PubSub.subscribe(this);
    }

    onMessage(event) {
        if (event.message = "spinner") {
            if (event.data == "show") {
                this.show();
            } else {
                this.hide();
            }
        }
    }

    // show waiting cursor
    show() {
        // To show the spinner
        document.getElementById("spinner").style.display = "block";
    }

    hide() {
        // To hide the spinner
        document.getElementById("spinner").style.display = "none";
    }


}