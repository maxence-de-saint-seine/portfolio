const io = require('socket.io')
const http = require('express')

io.on('connection', (socket) => {
    console.log('new user' + socket.id.substr(0,2))

    socket.on('guess', (guess) => {
        
    })
})