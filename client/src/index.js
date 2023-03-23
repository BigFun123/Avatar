import { Scene } from "./scene.js";
//import { Listen } from "./listen.js";
import { SpeechBubble } from "./SpeechBubble.js";
import { Spinner } from "./Spinner.js";
import { PubSub } from "./pubsub/pubsub.js";
const _spinner = new Spinner();
import { login } from "./login.js";


// first get the config.json file from the chatbot service
//

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Document loaded");
  const config = await fetch("/getconfig")
    .then((response) => response.json())
    .catch(err => {
      console.error(err);
      return;
    });
  console.log(config);
  loadScene(config);
});

function loadScene(config) {
  PubSub.send({messsage:"spinner", data:"show"});
  console.log("Loading scene");
  const scene = new Scene(config);
  var avatar = null;
  var voice = null;
  var speechBubble = new SpeechBubble(config);

  login();

  scene.createAvatar().then((navatar) => {
    console.log("Avatar created");
    avatar = navatar;
    speechBubble.setAvatar(avatar);
    PubSub.send({messsage:"spinner", data:"hide"});
  });

}


//var converse = new Converse(voice);

function log(e) {
  console.log(e);
}



