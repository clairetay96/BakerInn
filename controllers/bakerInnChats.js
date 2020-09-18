const jwt = require('jsonwebtoken')
const secret = "youGuess"

module.exports = (db) => {

    let modelChatFuncs = db.modelChatFuncsObj

    //request body must contain listing id, borrower id and owner id.
    let createChat = (request, response) => {
        let newChatInfo = request.body
        modelChatFuncs.newChat(userInput, (err, res)=>{
            if(err){
                response.status(500).send("Error occurred.")
            } else {
                response.status(200).send("New chat successfully created.")
            }
        })
    }

    //request body must contain message text, sender_id and chat_id
    let postMessage = (request, response) => {
        let messageInfo = request.body
        modelChatFuncs.postMessage(messageInfo, (err, res)=>{
            if(err){
                response.status(500).send("Error occurred.")
            } else {
                response.status(200).send("New message successfully posted.")
            }
        })
    }

    let getChat = (request, response) => {
        let chat_id = request.params.id //can also send in request body
        modelChatFuncs.getChatInfo(chat_id, (err, res)=> {
            if(err){
                response.status(500).send("Error occurred.")
            } else {
                response.status(200).send(res)
            }
        })
    }

    let getMessages = (request, response) => {
        let chat_id = request.params.id //can also send in request body
        modelChatFuncs.getChatMessages(chat_id, (err,res)=>{
            if(err){
                response.status(500).send("Error occurred.")
            } else {
                response.status(200).send(res)
            }
        })
    }


return {
    createChat,
    postMessage,
    getChat,
    getMessages

}

}