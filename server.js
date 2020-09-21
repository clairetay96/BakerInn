const routes = require('./routes')
const mongo = require('mongodb')
const modelFuncs = require('./models/bakerInn')
const modelChatFuncs = require('./models/bakerInnChats')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")


// middleware
app.use(express.json())
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}

app.use(methodOverride('_method'));
app.use(cookieParser());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const uri = "mongodb://localhost:27017"
const myClient = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//connect to mongo client to perform operations
myClient.connect((err, db) => {
  if (err) {
    throw err
  }
  //link up to bakerInn_db
  let bakerInnDB = db.db("bakerInn_db")
  let modelFuncsObj = modelFuncs(bakerInnDB)
  let modelChatFuncsObj = modelChatFuncs(bakerInnDB)

  // set up routes
  routes(app, { modelFuncsObj, modelChatFuncsObj })

})

//initialize io to receive connections
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//connect socket io
//handshake from client App.js to see who is user is
//to improve security we could check token here to verify socket connection
io.on('connection', (socket) => {
  console.log(socket.handshake.query.username , 'connected');

  //socket joins a room
  socket.on('join', ({room_id})=>{
    socket.join(room_id)
  })

  socket.on('leave', ({room_id})=>{
    socket.leave(room_id)
  })

  //on sendMessage event from client, message gets emitted to the room
  socket.on('sendMessage', ({ message, sender_name, chatroom_id, userroom_id, sender_id })=>{

    //if there are 2 people in the room, send the message to the room. Else send a notification.
    if(noOfClientsInRoom(chatroom_id) == 2) {
        console.log(sender_name)
        io.to(chatroom_id).emit('receiveMessage' + chatroom_id , { message, sender_name, sender_id } )

    } else if (noOfClientsInRoom(chatroom_id) < 2) {

        socket.to(userroom_id).emit('receiveNotification', { sender_name, chatroom_id })

    }

  })

  //notification of transferring ownership ONLY FOR SALE ITEMS
  socket.on('transferOwnership', ({chat_id})=>{
    io.to(chat_id).emit('receiveOwnership'+chat_id)
  })

  //sending loan confirmation from buyer to seller and vice versa FOR LOAN ITEMS
  socket.on('sendLoanConfirmation', ({chat_id}) => {
    socket.to(chat_id).emit('receiveLoanConfirmation'+chat_id)
  })

  socket.on('sendReturnConfirmation', ({chat_id}) => {
    socket.to(chat_id).emit('receiveReturnConfirmation'+chat_id)
  })

  socket.on('loanFinalised', ({chat_id}) => {
    io.to(chat_id).emit('receiveLoanFinalised'+chat_id)
  })

  socket.on('returnFinalised', ({chat_id}) => {
    io.to(chat_id).emit('receiveReturnFinalised'+chat_id)
  })




  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  function noOfClientsInRoom(room){
    let clients = io.nsps['/'].adapter.rooms[room]
    return Object.keys(clients).length
  }

});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
})


//close db connection when app is closed.
let onClose = function () {
  server.close(() => {
    console.log('Process terminated')
    myClient.close(() => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);