const routes = require('./routes')
const db = require('./db')
const path = require('path')
const express = require('express')
const app = express()

// middleware
app.use(express.json())
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}

// set up routes
routes(app, db)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
})