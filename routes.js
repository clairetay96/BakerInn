module.exports = (app, db) => {

  const bakerIn = require('./controllers/bakerInn')(db);

  app.get('/api', bakerIn.ping);


  //user CRUD operations
  app.get('/api/users', bakerIn.getAllUsers)

  app.post('/api/users/new', bakerIn.createUser)
  app.get('/api/users/:id', bakerIn.getUser)
  app.put('/api/users/:id/edit', bakerIn.editUser)
  app.delete('/api/users/:id/delete', bakerIn.deleteUser)

  //listings CRUD operations
  app.get('/api/listings', bakerIn.getAllListings)

  app.post('/api/listings/new')
  app.get('/api/listings/:id')
  app.put('/api/listings/:id/edit')
  app.delete('/api/listings/:id/delete')

  app.get('/api/search/listings/')
  app.get('/api/search/users/')

};