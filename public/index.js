import '../socket.io/socket.io.js'

const socket = window.io()

// Listen for message "new task" from the server
socket.on('issues', arg => {
  console.log(arg.hej)
})
