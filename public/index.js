import '../socket.io/socket.io.js'

const socket = window.io()

// Listen for message "new task" from the server
socket.on('issue', arg => {
  console.log(arg)
})
