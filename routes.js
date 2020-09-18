const withAuth = require("./authorization.js")

module.exports = (app, db) => {

  const bakerIn = require('./controllers/bakerInn')(db);
  const bakerInChats = require('./controllers/bakerInnChats')(db);

  // used middleware to check authorization
  app.get('/api', withAuth, bakerIn.ping);


  //user CRUD operations
  app.get('/api/users', bakerIn.getAllUsers)

  app.post('/api/users/new', bakerIn.createUser)

  app.post('/api/users/login', bakerIn.login)

  app.get('/api/users/:id', bakerIn.getUser)
  app.put('/api/users/:id/edit', bakerIn.editUser)
  app.delete('/api/users/:id/delete', bakerIn.deleteUser)

  //listings CRUD operations
  app.get('/api/listings', bakerIn.getAllListings)

  //create new listing
  app.post('/api/listings/new', bakerIn.makeNewListing)

  //get all of a user's posted listings
  app.get('/api/listings/user/:userid', bakerIn.getUserListings)

  //get all of a user's borrowed listings
  app.get('/api/listings/user/:userid/borrowed', bakerIn.getUserBorrowed)

  //get specific listing info
  app.get('/api/listings/:id', bakerIn.getListingInfo)


  //make changes to specific listing
  app.put('/api/listings/:id/edit')

  //delete specific listing
  app.delete('/api/listings/:id/delete')

  //when user expresses interest, create chat
  app.post('/api/chats/new', bakerInChats.createChat)

  //to get basic information on existing chat
  app.get('/api/chats/:id', bakerInChats.getChat)

  //post a new message to message collection
  app.post('/api/chats/:id/new-message', bakerInChats.postMessage)

  //post a message to a chat
  app.get('/api/chats/:id/messages', bakerInChats.getMessages)

  //search listings, search users
  app.get('/api/search/listings/')
  app.get('/api/search/users/')

};