import '../socket.io/socket.io.js'

const issueTemplate = document.querySelector('#issue-template').innerHTML

if (issueTemplate) {
  // Create a Handlebars template from the template-tag (rendered from issues.hbs)
  const hbsTemplate = window.Handlebars.compile(issueTemplate)

  // Create a socket connection using Socket.io
  const socket = window.io()

  // Listen for message "issue" from the server
  socket.on('issue', arg => {
    console.log(arg)
    const issue = hbsTemplate(arg)
    const div = document.createElement('div')
    div.innerHTML = issue

    const issueList = document.querySelector('#issue-list')
    console.log(issueList)
    issueList.appendChild(div)
  })
}
