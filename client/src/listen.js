export class Listen {
    constructor() {
        const recognition = new webkitSpeechRecognition(); // or SpeechRecognition() for non-webkit browsers
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = function() {
            console.log("We are listening. Try speaking into the microphone.");
        };

        recognition.onresult = event => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            console.log(`You said: ${transcript}`);
        };

        recognition.start();
    }
}