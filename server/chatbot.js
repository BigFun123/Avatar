const { Configuration, OpenAIApi, Completion } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const hostname = "localhost";
const port = 3001;

const { OPENAI_API_KEY } = require("./key");
const config = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/src"));

const server = http.createServer(app);

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
    console.log(req.body.prompt);
    const response = openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        temperature: 0.65,
        top_p: 1.0,
        max_tokens: 1024
    });
    response.then(async (data) => {
        console.log(data);
        res.send({ message: data.data.choices[0].text });
    }).catch(e => {
        console.log(e);
    });
});

app.route("/image").post((req, res) => {
    const response = openai.createImage({ prompt: req.body.prompt, n: 1, size: "512x512" });
    response.then(data => {
        res.send({ image: data.data.data[0].url });
    })
    .catch(e=>{
        res.send({ error: e.message });
    });
});

app.route("/listmodels").get((req, res) => {
    const response = openai.listModels();
    response.then(data => {
        res.send(data.data);
    });
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});