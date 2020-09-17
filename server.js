const routes = require('./routes')
const mongo = require('mongodb')
const modelFuncs = require('./models/bakerInn')
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

  // set up routes
  routes(app, { modelFuncsObj })

})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
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