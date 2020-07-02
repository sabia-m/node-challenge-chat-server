const express = require("express");
const cors = require("cors");
const bodyP = require("body-parser");

const app = express();


app.use(cors());
app.use(bodyP());

let messages = [
  {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
  {
  id: 1,
  from: "Me",
  text: "Hungry",
},
  {
  id: 2,
  from: "Todd",
  text: "Roadside",
}
];

//let messages = [welcomeMessage];

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

app.get("/messages/:id", (request, response) => {
  const messageId = request.params.id
  const chosenMessage = messages.find(message => message.id == messageId)
  response.json(chosenMessage)
})

app.delete("/messages/:id", (request, response) => {
  const messageId = request.params.id
   messages = messages.filter(message => message.id !== messageId)
  response.json({success: true})
})

app.listen(process.env.PORT);