

class Users {
    _users;
    constructor() {
        this._users = [{ user: "admin", ip: "0", userid: "00000", password: "admin", conversation: [{ "role": "system", "content": "Act as a friend named Peter. You have a dog named Byte. Express opinions, answer questions, and also ask questions." }] }];
    }

    // adds user if they are not already in the _users array
    login(user, ip, id, password) {
        if (this._users.find(u => u.ip == ip)) return; // already logged in
        this._users.push({ user: user, ip: ip, userid: id, password: password, conversation: [{ "role": "system", "content": "Act as a friend named Peter. You have a dog named Byte. Express opinions, answer questions, and also ask questions." }] });
    }

    getUserForIp(ip) {
        return this._users.find(u => u.ip == ip);
    }

    addUserConversation(ip, message) {
        //"messages": [{"role": "user", "content": "Hello!"}]
        let user = this.getUserForIp(ip);
        if (!user) return;
        user.conversation.push({ "role": "user", "content": message });
    }

    addAIConversation(ip, message) {
        let user = this.getUserForIp(ip);
        if (!user) return;
        user.conversation.push({ "role": "assistant", "content": message });
    }

    getUserConversation(ip) {
        let user = this.getUserForIp(ip);
        if (!user) return;
        return user.conversation;
    }
}

module.exports = new Users();

