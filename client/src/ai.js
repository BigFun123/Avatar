export class AI {
    //host = "http://localhost:3001";
    host="";
    constructor(config) {
        this.name = "AI";
    }

    // Get response from api using fetch
    ask(question) {
        return fetch(`${this.host}/message`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: question })
        })
            .then(response => response.json())
            .then(data => data.message);
    }

}