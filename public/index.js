const synth = window.speechSynthesis;

let voices = [];
let voice = null;
let text = "";

function populateVoiceList() {
  voices = synth.getVoices();
  const voicenames = voices.map(voice => voice.name);
  voicenames.forEach(v => console.log(v));
  //Yan
  voice = voices.find(v => v.name.indexOf("Ryan") > -1);
}

//populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(ntext) {
  text = ntext;
  setTimeout(() => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.addEventListener("boundary", animate);
    voice && (utterance.voice = voice);
    synth.speak(utterance);
  }, 1000);
}

function animate(e) {
  const t = e.currentTarget.text;
  const word = t.substring(e.charIndex, e.charIndex + e.charLength);
  console.log(word);
}

speak("Hello, I'm a text-to-speech system.");



