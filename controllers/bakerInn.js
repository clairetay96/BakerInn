const jwt = require('jsonwebtoken')
const secret = "youGuess"

module.exports = (db) => {

    let modelFuncs = db.modelFuncsObj

    let ping = (request, response) => {
        // requesting username from authorization middleware
        let username = request.username

        response.send(`WELCOME ${username}`);
    };


    let getAllUsers = (request, response) => {
        modelFuncs.getAllUsers((err, res) => {
            if (err) {
                console.log(err.message)
                response.send("Error occurred.")
            } else {
                response.send(res)
            }
        })
    }

    //for editing account information, must first get user information
    let getUser = (request, response) => {
        //some authentication here - only get this info if user is logged in.
        let userID = request.params.id
        modelFuncs.getUserFromID(userID, (err, res) => {
            if (err) {
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
        modelFuncs.createNewUser(newUserInfo, (err, res) => {
            if (err) {
                response.send("Error occurred.")
            } else {
                console.log(res)
            }
        })

    }

    let editUser = (request, response) => {
        //some authentication required
        let updatedUserInfo = request.body
        let userID = request.params.id //would rather use cookies here?
        modelFuncs.updateUserInfo(updatedUserInfo, userID, (err, res) => {
            if (err) {
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
        modelFuncs.deleteUser(userID, (err, res) => {
            if (err) {
                console.log(err)
                response.send("error occurred.")
            } else {
                response.send("Redirect to homepage.")
            }
        })

    }

    let getAllListings = (request, response) => {
        modelFuncs.getAllListings((err, res) => {
            if (err) {
                console.log(err)
                response.send("error occurred.")
            } else {
                response.send(res)
            }
        })
    }

    let makeNewListing = (request, response) => {
        let newListingInput = request.body
        // let userID; //from cookies
        // newListingInput.user_id = userID
        let username = request.username
        newListingInput.username = username;
        console.log(newListingInput)
        modelFuncs.makeNewListing(newListingInput, username, (err, res) => {
            if (err) {
                console.log(err)
                response.send("error occurred.")
            } else {
                response.send("success")
            }

        })

    }

    let getUserListings = (request, response) => {
        let userID = request.params.userid
        modelFuncs.getUserListing(userID, false, (err, res) => {
            if (err) {
                console.log(error)
                response.send("Error occurred.")
            } else {
                response.send(res)
            }
        })
    }

    //gets all of a user's currently borrowed listings.
    let getUserBorrowed = (request, response) => {
        //some authentication required - only a user can see their borrowed items
        let userID = request.params.userid
        modelFuncs.getUserListing(userID, true, (err, res) => {
            if (err) {
                console.log(err)
                response.send("Error occurred.")
            } else {
                response.send(res)
            }
        })
    }

    let getListingInfo = (request, response) => {
        let listingID = request.params.id
        modelFuncs.getOneListing(listingID, (err, res) => {
            if (err) {
                console.log(err)
                response.send("Error occurred.")
            } else {
                response.send(res)
            }
        })
    }

    let login = (request, response) => {
        let userLoginInfo = request.body
        console.log("userLoginInfo", userLoginInfo)
        modelFuncs.userLogin(userLoginInfo, (err, res) => {
            if (err) {
                response.send("Error occurred.")
            } else {
                if (res.result) {
                    // issue token
                    const payload = { email: res.email, username: res.username };
                    // encode data into token
                    const token = jwt.sign(payload, secret)
                    response.cookie('token', token).sendStatus(200)
                    console.log(token)
                    console.log("login successful")
                } else {
                    console.log("wrong password!")
                }
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
        getAllListings,
        makeNewListing,
        getUserListings,
        getUserBorrowed,
        getListingInfo,
        login
    }

};