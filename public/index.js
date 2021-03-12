import './socket.io/socket.io.js'
const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  // Create a Handlebars template from the template-tag (rendered from issues.hbs)
  const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)

  // Create a socket connection using Socket.io
  const socket = window.io({ path: '/hook/socket.io'})

  // Listen for message "issue" from the server
  socket.on('issue', arg => {
    const issue = hbsTemplate(arg)
    const div = document.createElement('div')
    div.innerHTML = issue

    const issueList = document.querySelector('#issue-list')
    issueList.appendChild(div)
  })
}
