const socket = io();

let activeUsers = {}

// Socket Events
socket.on("connect", onConnected);

socket.on('emit', (data) => {
    addMessage(data.user, data.time, data.message)
})

socket.on("usersUpdated", (data) => {
    let localUser = getData(USER)
    const {status, user} = data;
    const {id, name} = user;
    if(status === "joined"){
        activeUsers[id] = user;
        let content = `
            <div id="${id}" class="userItem">
                <img src="/public/images/user.png" width="20px" height="20px" alt="">
                &nbsp;&nbsp;
                <h5>${name} ${id === localUser.id ? '(You)' : ""}</h5>
            </div>
        `;
        document.getElementById("activeUsersList").innerHTML += content;
    } else {
        delete activeUsers[id]
    }
    toast(`'${name}' ${status} the chat`, status === "joined" ? 'success' : "error")
})

// Functions
function onConnected() {
	let user = getUser();
	if (user) {
		updateNameTag(user.name);
	} else {
		askForDetails("Enter your name");
	}
    let updatedUser = getUser()
    socket.emit("userConnected", updatedUser)
    if(!messageColors.hasOwnProperty(updatedUser.id)){
        messageColors[updatedUser.id] = generateColor()
    }
}

const getUser = () => {
	return getData(USER);
};

const askForDetails = (message) => {
    let id = 'id' + (new Date()).getTime();
	let name = prompt(message);
	if (name && name.length > 3) {
		setData(USER, { name, id });
		updateNameTag(name);
		return;
	}
	askForDetails("Name must have more than 3 characters!");
};

const updateNameTag = (user) => {
	let nametag = document.getElementById("nametag-txt");
	nametag.innerHTML = user;
};

const openUsersList = () => {
    document.getElementById("usersListDialog").open = true;
}

const closeUserListDialog = () => {
    document.getElementById("usersListDialog").open = false;
}