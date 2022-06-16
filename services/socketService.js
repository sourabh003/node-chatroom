module.exports = (io) => {
    let activeUsers = {}

    // On Connection
	io.on("connection", (socket) => {
		// Ran when a socket connected

        socket.on("userConnected", (data) => {
            activeUsers[socket.id] = data;
            io.emit("usersUpdated", activeUsers)
        })

        // On disconnect
        socket.on("disconnect", () => {
            delete activeUsers[socket.id]
            io.emit("usersUpdated", activeUsers)
        });

        socket.on("message", (data) => {
            socket.broadcast.emit("emit", data)
        });
	});
};
