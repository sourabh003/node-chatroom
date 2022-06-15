let messageColors = {}

$('#messageBox').on('keyup', 'input', function(e) {
    if (e.keyCode === "Enter") {
        alert('test')
    }
});

const generateColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

const enterEvent = () => {
    let key = window.event.keyCode;
    if(key === 13){
        sendMessage()
    }
}

const sendMessage = () => {
    let messageBox = document.getElementById("messageBox")
    if(!messageBox.value){
        return 
    }
    let user = getData(USER)
    let message = messageBox.value
    let time = getTime()
    socket.emit("message", {
        user, 
        message,
        time
    })
    addMessage(user, time, message)
    messageBox.value = ""
}

const addMessage = (user, time, content) => {
    let localUser = getData(USER)
    if(user.id !== localUser.id){
        playIncomingSound()
    }
    let messageList = document.getElementById("messagesList")
    if(!messageColors.hasOwnProperty(user.id)){
        messageColors[user.id] = generateColor()
    }
    let messageColor = messageColors[user.id]
    let messageContent = `
        <div class="message" style="background-color: #${messageColor};">
            <div class="message-header">
                <h5>${user.name}</h5>
                &nbsp;&bull;&nbsp;
                <h5>${time}</h5>
            </div>
            <h2>${content}</h2>
        </div>
    `;
    messageList.innerHTML += messageContent;
    messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: 'smooth',
    })
}

const playIncomingSound = () => {
    let audio = new Audio("/public/sounds/ping.mp3")
    audio.play()
}
