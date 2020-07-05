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
},
    {
  id: 3,
  from: "Alina",
  text: "Queen",
},
  {
  id: 4,
  from: "Serena",
  text: "Jimin",
},
  {
  id: 5,
  from: "J'uenelle",
  text: "Dessert",
},
    {
  id: 6,
  from: "Aqil",
  text: "Ghibli",
},
  {
  id: 7,
  from: "Jordanna",
  text: "Fenty",
},
  {
  id: 8,
  from: "Aliyah",
  text: "Metts",
},
    {
  id: 9,
  from: "Sonjide",
  text: "Cupcakes",
},
  {
  id: 10,
  from: "Cynthia",
  text: "JS",
},
  {
  id: 11,
  from: "Roxana",
  text: "Node",
},
{
  id: 12,
  from: "Mohbeen",
  text: "Netflix",
},
  {
  id: 13,
  from: "Fas",
  text: "Pokemon",
},
  {
  id: 14,
  from: "Yas",
  text: "Ironing",
},
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
  return response.status(404).send("Please fill all fields!")
  } else {
  messages.push(request.body);
  response.json({ success: true })};
});

app.get('/messages/search', (request, response) => {
  const search = request.query.text
  response.json(messages.filter(message => message.text.toLowerCase().includes(search.toLowerCase())))
})

app.get('/messages/latest', (request, response) => {
  response.json(messages.slice(messages.length - 10, messages.length))
})

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
