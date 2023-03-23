/**
 * enabled true/false
 */
function onEnable() {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true) {
        changeSetting("enabled", true);
    } else {
        changeSetting("enabled", false);
    }
}

/**
 * enabled true/false
 */
function onModel() {
    var model = document.getElementById("modelname").value;
    changeSetting("avatar", model);
}

function on3DModelChange() {
    var e = document.getElementById("select3dmodel");
    const model3d = e.options[e.selectedIndex].value;
    console.log("The Value is: " + e.options[e.selectedIndex].value + " and text is: " + e.options[e.selectedIndex].text);    
    changeSetting("avatar", model3d);
}

//change chatbot name
function onChatbotNameChange() {
    var e = document.getElementById("chatbotname");
    const chatbotname = e.value;
    console.log("The Value is: " + chatbotname);
    changeSetting("name", chatbotname);
}

// change chatbot location
function onChatbotLocationChange() {
    var e = document.getElementById("chatbotlocation");
    const chatbotlocation = e.value;
    console.log("The value is: " + chatbotlocation);
    changeSetting("location", chatbotlocation);
}

// change chatbot hobbies
function onChatbotHobbiesChange() {
    var e = document.getElementById("chatbothobbies");
    const chatbothobbies = e.value;
    console.log("The value is: " + chatbothobbies);
    changeSetting("hobbies", chatbothobbies);
}

// change voice
function onVoiceChange() {
    var e = document.getElementById("selectvoice");
    const voice = e.options[e.selectedIndex].value;
    console.log("The Value is: " + e.options[e.selectedIndex].value + " and text is: " + e.options[e.selectedIndex].text);
    changeSetting("voice", voice);
}

// change context
function onContextChange() {
    var e = document.getElementById("chatbotcontext");
    const context = e.value;
    console.log("The Value is: " + e.value);
    changeSetting("context", context);
}

// send a GET change request using the fetch api
function changeSetting(setting, value) {
    console.log(setting, value);
    fetch(`/setconfig/${setting}/${value}`)
        .then(response => response.json())
        .then(data => console.log(data));
}

// save all settings
function onSaveSettings() {
    onEnable();
    onModel();
    onChatbotNameChange();
    onChatbotLocationChange();
    onChatbotHobbiesChange();
    on3DModelChange();
    onVoiceChange();
    onContextChange();    
}

function getConfig() {
    fetch(`/getconfig`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("myCheck").checked = data.enabled;
            document.getElementById("chatbotname").value = data.name;
            document.getElementById("chatbotlocation").value = data.location;
            document.getElementById("chatbothobbies").value = data.hobbies;
            document.getElementById("select3dmodel").value = data.avatar;
            document.getElementById("selectvoice").value = data.voice;
            document.getElementById("chatbotcontext").value = data.context;
        });
}

getConfig();