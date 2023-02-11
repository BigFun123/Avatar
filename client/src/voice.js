
export class Voice {
    voices = [];
    voice = null;
    text = "";
    constructor() {
        this.synth = window.speechSynthesis;
        //populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = ()=>{this.populateVoiceList()};
        }
    }

    populateVoiceList() {
        this.voices = this.synth.getVoices();
        if (!this.voices) return;
        const voicenames = this.voices.map(voicedef => voicedef.name);
        //voicenames.forEach(v => console.log(v));
        //Yan
        this.voice = this.voices.find(v => v.name.indexOf("Ryan") > -1);
        if (this.voice == null) {
            this.voice = this.voices.find(v => v.name.indexOf("Guy") > -1);
        }
        if (this.voice == null) {
            this.voice = this.voices.find(v => v.name.indexOf("English") > -1);
        }
    }

    speak(ntext, startCallback, wordCallback, endCallback) {
        this.text = ntext;
        setTimeout(() => {
            this.synth.cancel();
            const utterance = new SpeechSynthesisUtterance(this.text);

            utterance.addEventListener("start", (e) => { startCallback(e); });
            utterance.addEventListener("end", (e) => { endCallback(e); });
            utterance.addEventListener("boundary", (e) => wordCallback(e));

            this.voice && (utterance.voice = this.voice);
            this.synth.speak(utterance);
        }, 500);
    }
}








