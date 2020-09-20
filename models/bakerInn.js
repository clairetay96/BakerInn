const mongo = require('mongodb')
const bcrypt = require("bcrypt")
const saltRounds = 10;
const ObjectId = mongo.ObjectId

module.exports = (db) => {

    let getAllUsers = (callback) => {
        db.collection("users").aggregate([{$project: {password: 0}}]).toArray()
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let getUserFromID = (userID, callback) => {
        db.collection("users").findOne({ _id: ObjectId(userID) })
            .then(res => {
                delete res.password
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let createNewUser = async (userInfo, callback) => {
        let emailResult = await db.collection("users").find({ email: userInfo.email }).toArray()
        let usernameResult = await db.collection("users").find({ username: userInfo.username }).toArray()
        if (emailResult.length > 0) {
            let error = "email has been taken"
            callback(error, null)
        } else if (usernameResult.length > 0) {
            let error = "username has been taken"
            callback(error, null)
        } else {
            // hashing password before storing into db
            bcrypt.hash(userInfo.password, saltRounds, (err, hash) => {
                if (err) {
                    console.log("error in password hashing")
                    callback(err, null)
                } else {
                    let hashedData = {
                        email: userInfo.email,
                        username: userInfo.username,
                        password: hash
                    }
                    db.collection("users").insertOne(hashedData)
                        .then(res => {
                            console.log(res)
                            let output = `welcome ${hashedData.username}`
                            callback(null, output)
                        })
                        .catch(err => {
                            console.log("err in createNewUser model", err)
                            callback(err, null)
                        })
                }
            })
        }
    }

    let userLogin = async (userLoginInfo, callback) => {
        let emailResult = await db.collection("users").find({ email: userLoginInfo.email }).toArray()

        // result returns true if the password matches
        bcrypt.compare(userLoginInfo.password, emailResult[0].password, (err, result) => {
            if (err) {
                console.log("err in userLogin model", err)
                callback(err, null)
            } else {
                let data = {
                    email: emailResult[0].email,
                    username: emailResult[0].username,
                    id: emailResult[0]._id,
                    result
                }
                callback(null, data)
            }
        })

    }

    let updateUserInfo = (updatedInfo, userID, callback) => {
        db.collection("users").updateOne({ _id: ObjectId(userID) }, { $set: updatedInfo })
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let deleteUser = (userID, callback) => {
        db.collection("users").deleteOne({ _id: ObjectId(userID) })
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let getAllListings = (callback) => {
        db.collection("listings").find({}).toArray()
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })

    }

    //put the new listing in listings collection, add listing to user info.
    let makeNewListing = (newListingInput, userID, callback) => {
        db.collection("listings").insertOne(newListingInput)
            .then(res => db.collection("users").updateOne({ _id: ObjectId(userID) }, { $push: { listings: res.insertedId } }))
            .then(res => callback(null, res))
            .catch(err => callback(err, null))
    }

    //get a user's posted listings or borrowed listings, depending on value of 'borrowed' (T/F) argument
    let getUserListing = (userID, borrowed, callback) => {
        db.collection("users").findOne({ _id: ObjectId(userID) })
            .then(res => {
                let userListings = borrowed ? res.borrowed : res.listings
                let allQueries = []
                userListings.forEach((listingID) => {
                    allQueries.push(
                        db.collection("listings").findOne({ _id: ObjectId(listingID) })
                            .then(res1 => {
                                let allQueries = []

                                allQueries.push(res1)
                                allQueries.push( db.collection("users").findOne({ _id: ObjectId(res1.user_id) }) )

                                return Promise.all(allQueries)
                            })
                            .then(res2 => {
                                res2[0].owner_info = { username: res2[1].username, user_id: res2[1]._id }
                                return res2[0]
                            })
                            .catch(err => { throw err })
                    )
                })
                return Promise.all(allQueries)
            })
            .then(allListings => { callback(null, allListings) }) //a list of containing objects, where each object represents a listing.
            .catch(err => { callback(err, null) })
    }


    let getOneListing = (listingID, callback) => {
        db.collection("listings").findOne({ _id: ObjectId(listingID) })
            .then(res => {

                let allQueries = []

                allQueries.push(res)
                allQueries.push(db.collection("users").findOne({ _id: ObjectId(res.owner_id) }))

                return Promise.all(allQueries)
            })
            .then(res1 => {

                res1[0].owner_info = { username: res1[1].username, user_id: res1[1]._id }

                callback(null, res1[0])
            })
            .catch(err => callback(err, null))

    }

    //add user interest to listing.
    let expressInterest = (listingID, userID, callback) =>{
        db.collection("listings").updateOne({_id: ObjectId(listingID)}, {$push: {interested: userID} })
            .then(res => {
                callback(null, res)
            })
            .catch(err => {callback(err, null)})

    }

    let makeUnavailable = (listingID, callback) => {
        db.collection("listings").updateOne({_id: ObjectId(listingID)}, {$set: {"state": "unavailable"}})
            .then(res => callback(null, res))
            .catch(err => callback(err, null))
    }


    return {
        getAllUsers,
        getUserFromID,
        createNewUser,
        updateUserInfo,
        getAllListings,
        makeNewListing,
        getUserListing,
        getOneListing,
        userLogin,
        expressInterest,
        makeUnavailable

    }
}