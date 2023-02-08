const synth = window.speechSynthesis;

let voices = [];
let voice = null;
let text = "";

const avatar = new Avatar("bob");

function populateVoiceList() {
  voices = synth.getVoices();
  const voicenames = voices.map(voice => voice.name);
  voicenames.forEach(v => console.log(v));
  //Yan
  voice = voices.find(v => v.name.indexOf("Ryan") > -1);
  if (voice == null) {
  voice = voices.find(v => v.name.indexOf("Guy") > -1);
  }    
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

    utterance.addEventListener("start", log);
    utterance.addEventListener("end", log);

    utterance.addEventListener("boundary", animate);
    voice && (utterance.voice = voice);
    synth.speak(utterance);
  }, 1000);
}

function log(e) {
console.log(e);
}

function animate(e) {
  const t = e.currentTarget.text;
  const word = t.substring(e.charIndex, e.charIndex + e.charLength);
  avatar.setWord(word);
  console.log(word);
}

speak("morning");

var button = document.getElementById("speak-button");
button.addEventListener("click", () => {
  speak("I'm a world famous avatar named guy");
});



