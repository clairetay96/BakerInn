const { response } = require('express');
const jwt = require('jsonwebtoken')
const secret = "youGuess"

module.exports = (db) => {

    let modelFuncs = db.modelFuncsObj

    let ping = (request, response) => {
        response.send('server up and running');
    };

    let validate = (request, response) => {
        response.status(200).send('verified')
    };


    let getAllUsers = (request, response) => {
        modelFuncs.getAllUsers((err, res) => {
            if (err) {
                console.log(err.message)
                response.status(500).send("Error occurred - cannot get all users.")
            } else {
                response.status(200).send(res)
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
                response.status(500).send("Error occurred.-- cannot get user info")
            } else {
                response.send(res)
            }
        })
    }

    let createUser = (request, response) => {
        let newUserInfo = request.body
        modelFuncs.createNewUser(newUserInfo, (err, res) => {
            if (err) {
                console.log(err)
                response.status(500).send(err)
            } else {
                response.status(201).send('user created')
            }
        })
    }

    let login = (request, response) => {
        let userLoginInfo = request.body
        console.log("userLoginInfo", userLoginInfo)
        modelFuncs.userLogin(userLoginInfo, (err, res) => {
            if (err) {
                response.status(500).send("user not found")
            } else {
                if (res.result) {
                    // issue token
                    const payload = { email: res.email, username: res.username, userId: res.id };
                    // encode data into token
                    const token = jwt.sign(payload, secret)
                    response.cookie('token', token).sendStatus(200)
                    console.log("login successful")
                } else {
                    response.status(401).send('wrong password')
                }
            }
        })
    }

    let editUser = (request, response) => {
        //some authentication required
        let updatedUserInfo = request.body
        let userID = request.userId
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
        let userID = request.userId
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
                response.status(500).send("error occurred. - cannot get all listings")
            } else {
                response.status(200).send(res)
            }
        })
    }

    let makeNewListing = (request, response) => {
        let newListingInput = request.body
        let userID = request.userId; //from cookies
        newListingInput.owner_id = userID
        newListingInput.state = "available"
        modelFuncs.makeNewListing(newListingInput, userID, (err, res) => {
            if (err) {
                console.log(err)
                response.status(500).send("error occurred. - cannot make new listing")
            } else {
                response.status(200).send("success")
            }
        })

    }

    let getUserListings = (request, response) => {
        let userID = request.params.userid
        modelFuncs.getUserListing(userID, false, (err, res) => {
            if (err) {
                console.log(err)
                response.status(500).send("Error occurred. - cannot get user listings")
            } else {
                response.status(200).send(res)
            }
        })
    }

    //gets all of a user's currently borrowed listings.
    let getUserBorrowed = (request, response) => {
        //some authentication required - only a user can see their borrowed items
        let userID = request.userId
        if(userID==request.params.userid){
            modelFuncs.getUserListing(userID, true, (err, res) => {
                if (err) {
                    console.log(err)
                    response.status(500).send("Error occurred. - cannot get user borrowed listings")
                } else {
                    response.status(200).send(res)
                }
            })
        } else {
            response.status(400).send("A user can only see their own borrowed items.")
        }
    }

    let getListingInfo = (request, response) => {
        let listingID = request.params.id
        modelFuncs.getOneListing(listingID, (err, res) => {
            if (err) {
                console.log(err)
                response.status(500).send("Error occurred. - cannot get listing info")
            } else {
                response.status(200).send(res)
            }
        })
    }

    // let expressInterest = (request, response) => {
    //     let listingID = request.params.id
    //     let userID = request.userId
    //     modelFuncs.expressInterest(listingID, userID, (err, res) => {
    //         if (err) {
    //             console.log(err)
    //             response.status(500).send("Error occurred. - cannot express interest")
    //         } else {
    //             response.status(200).send("successfully expressed interest.")
    //         }


    //     })
    // }


    // edit listing info
    let editListing = (request, response) => {
        let listingID = request.params.id
        let updatedListingInfo = request.body
        console.log("EDIT LISTING INFO IN CONTROLLER", updatedListingInfo)
        modelFuncs.updateListingInfo(updatedListingInfo, listingID, (err, res) => {
            if (err) {
                console.log(err)
                response.send("error occurred.")
            } else {
                response.send("Update Listing successfully")
            }
        })
    }

    let deleteListing = (request, response) => {
        let listingID = request.params.id
        modelFuncs.deleteListing(listingID, (err, res) => {
            if (err) {
                console.log(err)
                response.send("error occurred.")
            } else {
                response.send("Redirect to homepage.")
            }
        })
    }

    let makeTransaction = (request, response) => {
        let listingID = request.params.id
        let updateInfo = request.body
        modelFuncs.makeTransaction(listingID, updateInfo, (err, res)=>{
            if(err){
                console.log(err)
                response.status(500).send("Error occurred. - cannot make unavailable")
            } else {
                response.status(200).send("Listing made unavailable")
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
        login,
        validate,
        editListing,
        deleteListing,
        makeTransaction
    }

};