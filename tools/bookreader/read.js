const fs = require("fs");
const path = require("path");


const { MS_KEY } = require("./key");

const region = "eastus";


var sdk = require("microsoft-cognitiveservices-speech-sdk");
var readline = require("readline");

function read(text, voice, file) {
    var audioFile = file;
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(MS_KEY, region);
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

    // The language of the voice that speaks.
    // en-GB-OliverNeural
    // en-US-JennyNeural
    
    // best
    // en-GB-SoniaNeural
    // en-GB-RyanNeural
    speechConfig.speechSynthesisVoiceName = voice;

    // Create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);


    // Start the synthesizer and wait for a result.
    synthesizer.speakTextAsync(text,
        function (result) {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log(`synthesis finished ${file}.`);
            } else {
                console.error("Speech synthesis canceled, " + result.errorDetails +
                    "\nDid you set the speech resource key and region values?");
            }
            synthesizer.close();
            synthesizer = null;
        },
        function (err) {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = null;
        });
}

const bookname = "threemusketeers";
// load json from books folder
const bookjson = fs.readFileSync(path.join(__dirname, `./books/${bookname}.json`), "utf8");
const books = JSON.parse(bookjson);

for (var i = 0; i < books.length; i++) {
    const book = books[i];
    let voice = "en-GB-RyanNeural";
    if (book.speaker == "narrator") voice = "en-GB-RyanNeural";
    if (book.speaker == "M. d'Artagnan the elder") voice = "en-GB-EthanNeural";

    
    read(book.text, voice, `./books/${bookname}-${i}-${book.speaker}.mp3`);
};


