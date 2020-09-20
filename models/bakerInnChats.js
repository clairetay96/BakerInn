const mongo = require('mongodb')
const bcrypt = require("bcrypt")
const saltRounds = 10;
const ObjectId = mongo.ObjectId

module.exports = (db) => {

    //create new chat and then push to both users 'chats'
    let newChat = (newChatInfo, callback) => {
        db.collection("chats").insertOne(newChatInfo)
            .then(res=> {
                let queries = [res]

                 queries.push(db.collection("users").updateMany(
                    {_id:
                        {
                            $in: [ ObjectId(newChatInfo.owner_id),
                            ObjectId(newChatInfo.buyer_id) ]
                        }
                    },
                    { $push: { chats: res.insertedId }})
                        .then(res1 => res1))

                 return Promise.all(queries)
            })
            .then(res2=> {callback(null, res2[0])})
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
                    fields: ["username"],
                    table: "users",
                    id: ownerID
                },
                {
                    fields:[ "username"],
                    table: "users",
                    id: buyerID
                },
                {
                    fields: ["item", "state", "option", "buyer_id"],
                    table: "listings",
                    id: listingID
                }]


                queryParams.forEach((item) => {
                    allQueries.push(
                        db.collection(item.table).findOne({_id: ObjectId(item.id)})
                            .then(res => {
                                let resultArray = item.fields.map((field)=>{
                                    if(res){
                                        return res[field]
                                    } else {
                                        return null
                                    }
                                })
                                return resultArray
                            })
                            .catch(err => {throw err}))

                })


                return Promise.all(allQueries) //returns a list with [chatInfo, ownerName, buyerName, listingName, listingState, listingOption]

            })
            .then(res1 => {
                res1[0].owner_username = res1[1][0]
                res1[0].buyer_username = res1[2][0]
                res1[0].listing_item = res1[3][0]
                res1[0].listing_state = res1[3][1]
                res1[0].listing_option = res1[3][2]
                res1[0].successful_buyer_id = res1[3][3]
                callback(null, res1[0])
            })
            .catch(err => {callback(err, null)})
    }


    let getChatMessages = (chat_id, callback) => {
        db.collection("messages").find({chat_id: chat_id}).sort({ _id: 1}).toArray()
            .then(res => {
                let allQueries = []
                let senderNames = [] //store sender names of chat - once there are 2 stop querying the database and just compare against stored values
                res.forEach((message)=>{
                    if(senderNames.length < 2){
                        allQueries.push(
                            db.collection("users").findOne({_id: ObjectId(message.user_id)})
                                .then(res1 => {
                                    senderNames.push({sender_name: res1.username, sender_id: res1._id})
                                    message.sender_name = res1.username
                                    return message
                                })
                        )
                    } else if (senderNames.length == 2){
                        message.sender_name = message.user_id==senderNames[0].sender_id ? senderNames[0].sender_name : senderNames[1].sender_name

                    }

                })
                return Promise.all(allQueries)
            })
            .then(res => callback(null, res))
            .catch(err => callback(err, null))

    }

    //find one chat
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