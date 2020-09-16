module.exports = (db) => {

  let modelFuncs = db.modelFuncsObj

  let ping = (request, response) => {
    response.send('Server up and running');
  };


  let getAllUsers = (request, response) =>{
    modelFuncs.getAllUsers((err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred.")
        } else {
            response.send(res)
        }
    })
  }

  //for editing account information, must first get user information
  let getUser = (request, response) =>{
    //some authentication here - only get this info if user is logged in.
    let userID = request.params.id
    modelFuncs.getUserFromID(userID, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred.")
        } else {
            console.log(res)
            response.send(res)
        }
    })
  }

  let createUser = (request, response) => {
    let newUserInfo = request.body
    modelFuncs.createNewUser(newUserInfo, (err, res)=> {
        if(err){
            response.send("Error occurred.")
        } else {
            response.send("Success!")
        }
    } )

  }

  let editUser = (request, response) => {
    //some authentication required
    let updatedUserInfo = request.body
    let userID = request.params.id //would rather use cookies here?
    modelFuncs.updateUserInfo(updatedUserInfo, userID, (err, res)=>{
        if(err){
            console.log(err)
            response.send("error occurred.")
        } else {
            response.send("Redirect to dashboard")
        }

    })
  }

  let deleteUser = (request, response) => {
    //some authentication required
    let userID = request.params.id
    modelFuncs.deleteUser(userID, (err, res)=>{
        if(err){
            console.log(err)
            response.send("error occurred.")
        } else {
            response.send("Redirect to homepage.")
        }
    })

  }

  let getAllListings = (request, response) =>{
    modelFuncs.getAllListings((err, res)=>{
        if(err){
            console.log(err)
            response.send("error occurred.")
        } else {
            response.send(res)
        }
    })
  }

  return {
    ping,
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser,
    getAllListings
  }

};