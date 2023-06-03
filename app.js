const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middlewares
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/views/index.html`);
});

// Socket Service
require('./services/socketService')(io)

// Server Listener
http.listen(process.env.PORT || 4000, () => {
  console.log('Server started...')
});