module.exports = (io) => {
    // On Connection
	io.on("connection", (socket) => {
		// Ran when a socket connected

        // On disconnect
        // socket.on("disconnect", () => {
        // });

        socket.on("message", (data) => {
            socket.broadcast.emit("emit", data)
        });
	});
};
