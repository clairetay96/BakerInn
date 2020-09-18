const mongo = require('mongodb')
const bcrypt = require("bcrypt")
const saltRounds = 10;
const ObjectId = mongo.ObjectId

module.exports = (db) => {

    //create new chat and then push to both users 'chats'
    let newChat = (newChatInfo, callback) => {
        db.collection("chats").insertOne(newChatInfo)
            .then(res=> {
                return db.collection("users").updateMany(
                    {_id:
                        {
                            $in: [ ObjectId(newChatInfo.owner_id),
                            ObjectId(newChatInfo.buyer_id) ]
                        }
                    },
                    { $push: { chats: res.insertedId }})
            })
            .then(res1=> {callback(null, res1)})
            .catch(err => {callback(err,null)})
    }

    let postMessage = (newMessageInfo, callback) => {
        db.collection("messages").insertOne(newMessageInfo)
            .then(res => {callback(null, res)})
            .catch(err => {callback(err,null)})
    }

    //chat info as well as listing name, owner username and buyer username
    let getChatInfo = (chatID, callback) => {
        db.collection("chats").findOne({_id: ObjectId(chatID)})
            .then(res => {
                let allQueries = [res]
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
                        db.collection(item.table).findOne({_id: ObjectId(item.id)})
                            .then(res => res[item.field])
                            .catch(err => {throw err}))
                })


                return Promise.all(allQueries) //returns a list with [chatInfo, ownerName, buyerName, listingName]

            })
            .then(res1 => {
                res1[0].owner_username = res1[1]
                res1[0].buyer_username = res1[2]
                res1[0].listing_item = res1[3]
                callback(null, res1)
            })
            .catch(err => {callback(err, null)})
    }


    let getChatMessages = (chat_id, callback) => {
        db.collection("messages").find({chat_id: chat_id}).sort({ _id: 1}).toArray()
            .then(res => callback(null, res))
            .catch(err => callback(err, null))

    }

    let getChatId = (chatInfo, callback) => {
        db.collection("chats").findOne(chatInfo)
            .then(res=>callback(null, res))
            .catch(err=>callback(err, null))
    }

    return {
        newChat,
        postMessage,
        getChatInfo,
        getChatMessages,
        getChatId

    }

}