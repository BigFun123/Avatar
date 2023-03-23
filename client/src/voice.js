
export class Voice {
    voices = [];
    voice1 = null;
    voice2 = null;
    text = "";
    _name;
    _enabled = false;
    constructor(config) {
        this._name = config.name;
        this.synth = window.speechSynthesis;
        if (config.voice == "none") return ;
        this._enabled = true;
        //populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = ()=>{this.populateVoiceList(config.voice)};
        }
    }

    getNameForGender(gender) {
        if (gender == "male") {
            return "Ryan";
        }
        if (gender == "female" ) {
            return "Zira";
        }
        return gender;
    }

    populateVoiceList(name) {
        this.voices = this.synth.getVoices();
        if (!this.voices) return;
        name = this.getNameForGender(name);
        const voicenames = this.voices.map(voicedef => voicedef.name);
        voicenames.forEach(v => console.log(v));
        //Yan
        this.voice1 = this.voices.find(v => v.name.indexOf(name) > -1);
        if (this.voice1 == null) {
            this.voice1 = this.voices.find(v => v.name.indexOf("Guy") > -1);
        }
        if (this.voice1 == null) {
            this.voice1 = this.voices.find(v => v.name.indexOf("English") > -1);
        }


        this.voice2 = this.voices.find(v => v.name.indexOf("Jenny") > -1);
        if (this.voice2 == null) {
            this.voice2 = this.voices.find(v => v.name.indexOf("Aria") > -1);
        }
        if (this.voice2 == null) {
            this.voice2 = this.voices.find(v => v.name.indexOf("English") > -1);
        }
    }

    speak(voiceNum, ntext, startCallback, wordCallback, endCallback) {
        if (!this._enabled) return;
        this.text = ntext;
        setTimeout(() => {
            this.synth.cancel();
            const utterance = new SpeechSynthesisUtterance(this.text);

            startCallback && utterance.addEventListener("start", (e) => { startCallback(e); });
            endCallback && utterance.addEventListener("end", (e) => { endCallback(e); });
            wordCallback && utterance.addEventListener("boundary", (e) => wordCallback(e));

            voiceNum == 1 && this.voice1 && (utterance.voice = this.voice1);
            voiceNum == 2 && this.voice2 && (utterance.voice = this.voice2);
            
            this.synth.speak(utterance); 
        }, 200);
    }
}









