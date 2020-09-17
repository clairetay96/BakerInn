const mongo = require('mongodb')
const ObjectId = mongo.ObjectId

module.exports = (db) =>{

    let getAllUsers = (callback) =>{
        db.collection("users").find({}).toArray()
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let getUserFromID = (userID, callback) => {
        db.collection("users").findOne({_id: ObjectId(userID)})
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let createNewUser = (userInfo, callback) => {
        db.collection("users").insertOne(userInfo)
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let updateUserInfo = (updatedInfo, userID, callback) => {
        db.collection("users").updateOne({_id: ObjectId(userID)}, {$set: updatedInfo})
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let deleteUser = (userID, callback) =>{
        db.collection("users").deleteOne({_id: ObjectId(userID)})
            .then(res => {
                callback(null, res)
            })
            .catch(err => {
                callback(err, null)
            })
    }

    let getAllListings = (callback) =>{
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
            .then(res => db.collection("users").updateOne({_id: ObjectId(userID)}, {$push: {listings: res.insertedId} }))
            .then(res => callback(null, res))
            .catch(err => callback(err, null))
    }

    //get a user's posted listings or borrowed listings, depending on value of 'borrowed' (T/F) argument
    let getUserListing = (userID, borrowed, callback) => {
        db.collection("users").findOne({_id:ObjectId(userID)})
            .then(res => {
                let userListings = borrowed ? res.borrowed : res.listings
                let allQueries = []
                userListings.forEach((listingID)=>{
                    allQueries.push(
                        db.collection("listings").find({_id: ObjectId(listingID)})
                            .then(res => res)
                            .catch(err => {throw err})
                        )
                })
                return Promise.all(allQueries)
            })
            .then(allListings => {callback(null, allListings)})
            .catch(err => {callback(err, null)})
    }


    let getOneListing = (listingID, callback) => {
        db.collection("listings").findOne({_id: ObjectId(listingID)})
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
        getOneListing

    }
}