module.exports = (io) => {
    let activeUsers = {}

    // On Connection
	io.on("connection", (socket) => {
		// Ran when a socket connected

        socket.on("userConnected", (data) => {
            activeUsers[socket.id] = data;
            io.emit("usersUpdated", {
                status: "joined",
                user: activeUsers[socket.id]
            })
        })

        // On disconnect
        socket.on("disconnect", () => {
            io.emit("usersUpdated", {
                status: "left",
                user: activeUsers[socket.id]
            })
            delete activeUsers[socket.id]
        });

        socket.on("message", (data) => {
            socket.broadcast.emit("emit", data)
        });
	});
};
