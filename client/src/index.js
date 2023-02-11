import { Voice } from "./voice.js";
import { Scene } from "./scene.js";
import { AI } from "./ai.js";
import { Listen } from "./listen.js";

const inputbox = document.getElementById("input-box");

//const avatar = new Avatar("bob");
const scene = new Scene();
var avatar = null;
var voice = null;
var ai = new AI();
var listen = new Listen();

scene.createAvatar().then((navatar) => {
  console.log("Avatar created");
  avatar = navatar;
});

voice = new Voice();

function log(e) {
  console.log(e);
}

function animate(e) {
  const t = e.currentTarget.text.toLowerCase();
 // console.log("----->", e.name, e.type);
  if (e.name == "word") {
    const word = t.substring(e.charIndex, e.charIndex + e.charLength);
    avatar.setWord(word);
   // console.log(word);
  }
}

var button = document.getElementById("speak-button");
button.addEventListener("click", () => {
  voice.speak(inputbox.value, () => avatar.animate("talk"), animate, () => avatar.animate("idle"));
});

var askbutton = document.getElementById("ask-button");
askbutton.addEventListener("click", () => {
  ai.ask(inputbox.value)
    .then(response => {
      response = response.trim();
    voice.speak(response, () => avatar.animate("talk"), animate, () => avatar.animate("idle"));
  });
});

