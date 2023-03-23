const fs = require("fs");
const path = require("path");
const { Configuration, OpenAIApi, Completion } = require("openai");

const { OPENAI_API_KEY } = require("./key");
const openAIConfig = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(openAIConfig);

let promptPrefix = "";

async function convertToJSON(filetxt) {
    const book = fs.readFileSync(path.join(__dirname, "./books/" + filetxt + ".txt"), "utf8");
    // truncate to 1024 tokens
    const bookTokens = book.split(" ");
    const bookTokensTruncated = bookTokens.slice(0, 1024);
    const bookTruncated = bookTokensTruncated.join(" ");

    console.info(promptPrefix + "\n" + bookTruncated);

    const response = openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptPrefix + "\n" + bookTruncated,
        temperature: 0.35,        
        max_tokens: 2048
    });
    response.then(async (data) => {
        let completion = data.data.choices[0].text;
        completion = completion.trim();
        completion = completion.replace('_', ' ');
        // save the file to json
        fs.writeFileSync(path.join(__dirname, "./books/" + filetxt + ".json"), completion);
    }).catch(e => {
        console.log("error", e);
    });
}

async function run() {
    await convertToJSON("threemusketeers");
}

//load the promptPrefix from prompt.txt
promptPrefix = fs.readFileSync(path.join(__dirname, "./prompt.txt"), "utf8");

console.log("Setup complete. Converting to json");
run();
console.log("done");

