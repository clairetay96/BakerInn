module.exports = (app, db) => {

  const bakerIn = require('./controllers/bakerInn')(db);

  app.get('/api', bakerIn.ping);
};