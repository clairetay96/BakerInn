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
        db.collection("users").updateOne({_id: ObjectId(userID)}, updatedInfo)
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


    return {
        getAllUsers,
        getUserFromID,
        createNewUser,
        updateUserInfo,
        getAllListings

    }
}