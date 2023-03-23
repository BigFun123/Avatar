export function login() {
    return fetch(`/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: "user", password: "password", userid: "123" })
    })
        .then(response => response.json())
        .then(data => console.log(data.message));
}
