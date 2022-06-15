const socket = io();

// Socket Events
socket.on("connect", onConnected);

socket.on('emit', (data) => {
    addMessage(data.user, data.time, data.message)
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
