const mongo = require('mongodb')
const bcrypt = require("bcrypt")
const saltRounds = 10;
const ObjectId = mongo.ObjectId

module.exports = (db) => {

    let newChat = (newChatInfo, callback) => {
        db.collections("chats").insertOne(newChatInfo)
            .then(res=> {callback(null, res)})
            .catch(err => {callback(err,null)})
    }

    let postMessage = (newMessageInfo, callback) => {
        db.collections("messages").insertOne(newMessageInfo)
            .then(res => {callback(null, res)})
            .catch(err => {callback(err,null)})
    }

    //chat info as well as listing name, owner username and buyer username
    let getChatInfo = (chatID, callback) => {
        db.collections("chats").findOne({_id: ObjectId(chatID)})
            .then(res => {
                let allQueries = []
                let ownerID = res.owner_id
                let buyerID = res.buyer_id
                let listingID = res.listing_id

                let queryParams = [
                {
                    field: "username",
                    table: "users",
                    id: ownerID
                },
                {
                    field: "username",
                    table: "users",
                    id: buyerID
                },
                {
                    field: "item",
                    table: "listings",
                    id: listingID
                }]


                queryParams.forEach((item) => {
                    allQueries.push(
                        db.collections(item.table).findOne({_id: ObjectId(item.id)})
                            .then(res => res[item.field])
                            .catch(err => {throw err}))
                })


                return Promise.all(allQueries)

            })
            .then(res1 => {
                res.owner_username = res1[0]
                res.buyer_username = res1[1]
                res.listing_item = res1[2]
                callback(null, res)
            })
            .catch(err => {callback(err, null)})
    }


    let getChatMessages = (chat_id, callback) => {
        db.collections("messages").find({_id: ObjectId(chat_id)}).sort({ _id: 1}).toArray()
            .then(res => callback(null, res))
            .catch(err => callback(err, null))

    }

    return {
        newChat,
        postMessage,
        getChatInfo,
        getChatMessages

    }

}