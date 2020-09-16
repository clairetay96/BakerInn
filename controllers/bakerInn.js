module.exports = (db) => {

  let ping = (request, response) => {
    response.send('Server up and running');
  };

  return {
    ping,
  }

};