import { Voice } from "./voice.js";
import { AI } from "./ai.js";
import { PubSub } from "./pubsub/pubsub.js";

export class SpeechBubble {
    constructor(config) {
        this._input = document.getElementById("speech-bubble-input");
        this._input.addEventListener("keyup", (event) => this.onInput(event));
        this._output = document.getElementById("speech-bubble-output");
        this._stem = document.getElementById("speech-bubble-stem");
        
        this._ai = new AI(config);
        this._voice = new Voice(config);
        this.hideBubble();
    }

    onInput(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.ask(this._input.value);
            this._input.style = "background-color: #ddd";
        }
    }

    setAvatar(avatar) {
        this._avatar = avatar;
    }

    ask(text) {
        PubSub.send({message:"spinner", data:"show"});
        this._ai.ask(text)
            .then(response => {
                response = response.trim();
                this._output.value = response;
                this._input.value = "";
                this._input.style = "background-color: #fff";
                //this._voice.speak(1, response, () => this._avatar.animate("talk"), (e)=>this.animate(e), () => this._avatar.animate("idle"));
                this.speak(response);
                PubSub.send({message:"spinner", data:"hide"});
            }).catch(e => {
                console.log(e);
                PubSub.send({message:"spinner", data:"hide"});
            });
    }

    speak(text) {
        this._output.style.display = "flex";
        this._stem.style.display = "flex";
        this._voice.speak(1, text, () => this._avatar.animate("talk"), (e)=>this.animate(e), ()=>this.gotoIdle());
    }

    gotoIdle() {
        this._avatar.animate("idle");
        this.hideBubble();
    }

    // hide speech bubble output div
    hideBubble() {        
        this._output.value = "";
        this._output.style.display = "none";
        this._stem.style.display = "none";
    }

    animate(e) {
        const t = e.currentTarget.text.toLowerCase();
       // console.log("----->", e.name, e.type);
        if (e.name == "word") {
          const word = t.substring(e.charIndex, e.charIndex + e.charLength);
          this._avatar.setWord(word);
         // console.log(word);
        }
      }

}