const dotenv = require("dotenv")
const express = require("express");
const mongodb = require("mongodb")
const cors = require("cors");
const bodyP = require("body-parser");

const app = express();

dotenv.config()

app.use(cors());
app.use(bodyP());

const port = process.env.PORT || 3000

const uri = process.env.DATABASE_URI

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/messages", (request, response) => {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db('messages')
    const collection = db.collection('chats')

    collection.find().toArray(function (error, chats) {
      response.send(error || chats)
})
})
});

app.post("/messages", (request, response) => {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db('messages')
    const collection = db.collection('chats')
    const newMessage = {}

    var ObjectId = mongodb.ObjectID
      var id = new ObjectId();
      console.log(id)
      newMessage._id = id

    if (request.query.from){
      newMessage.from = request.query.from
    } else {
      response.send(400)
    }

    if (request.query.text){
      newMessage.text = request.query.text
    } else {
      response.send(400)
    }

    console.log(newMessage)
    collection.insertOne(newMessage, function (error, result) {
      response.send(error || result.ops[0]);
      console.log("Message sent")
      client.close();
    });
  })
});

app.get('/messages/search', (request, response) => {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db('messages')
    const collection = db.collection('chats')

    const searchObject = {}

    if (request.query.text) {
      searchObject.text = request.query.text
    }

    collection.find(searchObject).toArray(function(error, chats) {
      response.send(error || chats)
      client.close()
    })
  })
})

app.get('/messages/latest', (request, response) => {
  const client = new mongodb.MongoClient(uri)

  client.connect(function(){
  const db = client.db('messages')
  const collection = db.collection('chats')

  collection.find().sort({"_id": -1}).limit(10).toArray(function(error, result) {
    response.send(error || result)
    client.close();
  })
})
})

app.get("/messages/:id", (request, response) => {
  const client = new mongodb.MongoClient(uri)
  let id = new mongodb.ObjectID(request.params.id)

  client.connect(function() {
    const db = client.db('messages')
    const collection = db.collection('chats')

    const searchObject = { _id: id }

    collection.findOne(searchObject, function(error, chat) {
        response.send(error || chat)
      client.close()
    })
  })
})

app.delete("/messages/:id", (request, response) => {
  const client = new mongodb.MongoClient(uri)
  let id = new mongodb.ObjectID(request.params.id)

  client.connect(function() {
    const db = client.db('messages')
    const collection = db.collection('chats')

    const searchObject = { _id: id }

    collection.deleteOne(searchObject, function(error, chat) {
      if (chat.deletedCount) {
        response.status(204).send("Successfully deleted!");
      } else if(chat._id !== id) {
        response.status(404).send("Sorry, this ID does not exist.");
      }
      client.close()
})
  })
})

app.listen(port || 3000, function() {
  console.log(`Running at \`http://localhost:${port}\`...`)
})
