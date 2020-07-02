const express = require("express");
const cors = require("cors");
const bodyP = require("body-parser");

const app = express();


app.use(cors());
app.use(bodyP());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];

console.log(messages)

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/messages", (request, response) => {
  response.json(messages);
});

app.post("/messages", (request, response) => {
  if (request.body.text === '' || request.body.from === ''){
    return response.status(404)
  } else {
  messages.push(request.body);
  response.json({ success: true })};
});


app.get("/messages/:messageId", (request, response) => {
  const messageId = request.params.id
  const chosenMessage = messages.find(message => message.messageId === messageId)
  response.json(chosenMessage)
})

app.delete("/messages/:messageId", (request, response) => {
  const messageId = request.params.id
  messages = messages.filter(message => message.messageId !== messageId)
  response.json({success: true})
})

app.listen(process.env.PORT);