import { AI } from "./ai";
import { Voice } from "./voice";

export class Converse {
    _p1;
    _p2;
    _cb;
    _host = "http://myworld3d.com:3001";
    _ail
    _voice;
    constructor(voice) {
        this._ail = new AI();
        this._cb = document.getElementById("converse-button");
        this._cb.addEventListener("click", () => this.seed());
        this._p1 = document.getElementById("p1");
        this._p2 = document.getElementById("p2");
        this._voice = voice;
    }

    show() {
        let  converse =  document.getElementById("converse");
        converse.style.display = "flex";
    }

    hide() {
        let  converse =  document.getElementById("converse");
        converse.style.display = "none";
    }

    seed() {
        this._voice.speak(2, this._p1.value, null, null, ()=>this.getResponse2());
    }

    // call open fetch api
    getResponse2() {
        let q = this._p1.value + ". Answer as if you were a boy and then ask a question. ";
        console.log(q);
        this._ail.ask(q)
            .then(response => {
                response = response.trim();
                console.log(response);
                this._p2.value = response;
                this._voice.speak(1, response, null, null, ()=>this.resp2Done());
            });
    }

    resp2Done() {
        this.getResponse();                
    }

    getResponse() {
        let q = this._p2.value + ". Answer as if you were a girl and then ask a question. ";
        console.log(q);
        this._ail.ask(q)
            .then(response => {
                console.log(response);
                response = response.trim();
                this._p1.value = response;
                this._voice.speak(2, response, null, null, ()=>this.respDone());
            });
    }

    respDone() {
        this.getResponse2();
    }


}