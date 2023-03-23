/**
 * Chatbot backend using OPENAI API
 * TODO: restrict size
 * Default context = `Act as a friendly ${ChatBotConfig.role} named ${ChatBotConfig.name}. You live in ${ChatBotConfig.location}. Your hobbies are ${ChatBotConfig.hobbies}`
 */
const fs = require("fs");
const path = require("path");
const { Configuration, OpenAIApi, Completion } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const Users = require("./src/users");

const log = require("./src/log");
log("Chatbot backend starting...");

const hostname = "localhost";
const port = 3001;
var ChatBotConfig = require("./config/config.json");
console.log("ChatBotConfig", ChatBotConfig);
const ChatBotConfigPath = path.join(__dirname, "/config/config.json");

const { OPENAI_API_KEY } = require("./key");
const openAIConfig = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(openAIConfig);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/../client/dist"));
app.use("/config", express.static(__dirname + "/config"));
app.use(function (error, req, res, next) {
    console.log(req);
    console.log(error);
    log(req);
    if (error) {
        log(error);
    }
    //res.status(500).send({ error: error.message });
});

const server = http.createServer(app);
var promptPrefix = "";
setPromptPrefix();


/*
app.route("/")
    .get((req, res) => {
        console.log(req.header.host);
        console.log(req.body.message);
        //res.sendFile(__dirname + "/index.html");
        //res.status(200).send({ message: "Hello World" });
    });
*/

app.route("/message").post((req, res) => {
    if (ChatBotConfig.enabled) {

        const ip = req.socket.remoteAddress;
        const user = Users.getUserForIp(ip);
        if (!user) {
            res.send({ message: "You are not logged in. Please refresh the page." });
            return;
        }

        const message = req.body.prompt.trim();

        if (!message) {
            res.send({ message: "Please enter a message" });
            return;
        }

        Users.addUserConversation(ip, message);

        const conversation = Users.getUserConversation(ip);
        console.log(conversation);

        log("message", {"ip": ip, "role": "user", "data": message});
        const response = openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: conversation
        });
        response.then(async (data) => {
            let completion = data.data.choices[0].message.content;
            let role = data.data.choices[0].message.role;
            completion = completion.trim();
            const ip = req.socket.remoteAddress;
            const user = Users.getUserForIp(ip);
            Users.addAIConversation(ip, completion);
            log("completion", { ip: ip, role: role, message: completion });
            res.send({ message: completion });
        }).catch(e => {
            log("error", e.toJSON());
        });
    } else {
        res.send({ message: "Chatbot is offline. Please try again later" });
    }
});

app.route("/login").post((req, res) => {

    const logino = req.body;
    const name = logino.user;
    const ip = req.socket.remoteAddress;
    logino.ip = ip;
    const id = logino.userid;
    const password = logino.password;
    log("login,", logino);
    Users.login(name, ip, id, password);
    res.send({ message: "Logged in" });
});

app.route("/image").post((req, res) => {
    log(req.body.prompt);
    const response = openai.createImage({ prompt: req.body.prompt, n: 1, size: "512x512" });
    response.then(data => {
        res.send({ image: data.data.data[0].url });
    })
        .catch(e => {
            res.send({ error: e.message });
        });
});

app.route("/listmodels").get((req, res) => {
    log("listmodels");
    const response = openai.listModels();
    response.then(data => {
        res.send(data.data);
    });
});

// read the config.json file from the config folder
app.route("/getconfig").get((req, res) => {
    log("getconfig");
    res.send(ChatBotConfig);
});

// read the config.json file from the config folder
app.route("/setconfig/:key/:value").get((req, res) => {
    log("setconfig", { key: req.params.key, value: req.params.value });
    ChatBotConfig[req.params.key] = req.params.value;
    fs.writeFileSync(ChatBotConfigPath, JSON.stringify(ChatBotConfig, null, 2));
    res.send(ChatBotConfig);
    ChatBotConfig = require("./config/config.json");
    setPromptPrefix();
});

function setPromptPrefix() {
    promptPrefix = `Act as a friendly ${ChatBotConfig.role} named ${ChatBotConfig.name}. You live in ${ChatBotConfig.location}. Your hobbies are ${ChatBotConfig.hobbies}.\n`
    log("promptPrefix: " + promptPrefix);
}

server.listen(port, "", () => {
    let addre = server.address().address;
    log(`Server running at ${addre} http://${hostname}:${port}/`);
});
