const withAuth = require("./authorization.js")

module.exports = (app, db) => {

  const bakerIn = require('./controllers/bakerInn')(db);

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
  app.post('/api/listings/new', withAuth, bakerIn.makeNewListing)

  //get all of a user's posted listings
  app.get('/api/listings/user/:userid', bakerIn.getUserListings)

  //get all of a user's borrowed listings
  app.get('/api/listings/user/:userid/borrowed', bakerIn.getUserBorrowed)

  //get specific listing info
  app.get('/api/listings/:id', bakerIn.getListingInfo)

  //borrow a specific listing - changes listing state to on loan
  app.post('/api/listings/:id/borrow')

  //make a specific listing unavailable - changes listing state to unavailable
  app.post('/api/listings/:id/unavailable')

  //return a specific listing - changes listing state to available
  app.post('/api/listings/:id/returned')


  //make changes to specific listing
  app.put('/api/listings/:id/edit')
  //delete specific listing
  app.delete('/api/listings/:id/delete')

  //search listings, search users
  app.get('/api/search/listings/')
  app.get('/api/search/users/')

};