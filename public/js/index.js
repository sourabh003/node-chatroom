const socket = io();

// Socket Events
socket.on("connect", onConnected);

socket.on('emit', (data) => {
    addMessage(data.user, data.time, data.message)
})

socket.on("usersUpdated", (data) => {
    let localUser = getData(USER)
    const {status, user, activeUsers} = data;
    const {id, name} = user;
    toast(`'${localUser.id === id ? "You" : name}' ${status} the chat`, status === "joined" ? 'success' : "error")
    Object.keys(activeUsers).map(key => {
        let user = activeUsers[key]
        const {name, id} = user;
        let content = `
            <div id="${id}" class="userItem">
                <img src="/public/images/user.png" width="20px" height="20px" alt="">
                &nbsp;&nbsp;
                <h5>${name} ${id === localUser.id ? '(You)' : ""}</h5>
            </div>
        `;
        document.getElementById("activeUsersList").innerHTML += content;
    })
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