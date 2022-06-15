module.exports = (io) => {
    // On Connection
	io.on("connection", (socket) => {
		// Ran when a socket connected
		console.log("a device connected");

        // On disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });

        socket.on("message", (data) => {
            socket.broadcast.emit("emit", data)
        });
	});
};
