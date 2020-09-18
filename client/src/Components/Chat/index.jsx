import React, { useState, useEffect } from 'react'
import './index.css'
import io from 'socket.io-client'

let socket;

export default function Chat({ chat_id, user_id }) {

  //where chat_id is the chat_id and user_id is the logged in user_id

  const ENDPOINT = "localhost:5000"
  const cookie = document.cookie
  const userID = JSON.parse(atob(cookie.split(".")[1])).iat
  console.log(userID)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [sender, setSender] = useState({}) //object containing user_id, username and whether this user is the owner of the item
  const [receiver, setReceiver] = useState({})


  useEffect(()=>{
    //fetch chat data from database
    //fetch previous messages from database
    fetch(`/api/chats/${chat_id}`)
        .then(res => {
            let sender_id = res.buyer_id
            let sender_username = res.buyer_username
            let receiver_id = res.owner_id
            let receiver_username = res.owner_username

            if(user_id === res.owner_id) {
                sender_id = res.owner_id
                sender_username = res.owner_username
                receiver_id = res.buyer_id
                receiver_username = res.buyer_username

            }

            let listing_id = res.listing_id
            let listing_item = res.listing_item

            // setSender(
            //     {
            //         user_id: sender_id,
            //         isOwner:
            //         username: sender_username
            //     })

            // setReceiver(
            //     {
            //         user_id:
            //         isOwner:
            //         username:
            //     })

        })
        .catch(err => console.log(err))

    fetch(`/api/chats/${chat_id}/messages`)
    //set messages state to contain messages.

  }, [])

  useEffect(()=>{
    //socket to join chat room - emit
    socket = io(ENDPOINT)
    console.log("This is io!", socket)
    socket.emit('join', { room_id: 'room' + chat_id })

  }, [ENDPOINT])


  useEffect(()=>{
    //socket to  receive message - on
    socket.on('receiveMessage', ( { message, sender_name } )=>{
        setMessages([...messages, message])
    })


  }, [])


const sendMessage = (event) => {
    event.preventDefault()

    let messageInfo = {
        message,
        sender_name: sender.username,
        chatroom_id: 'room' + chat_id,
        userroom_id: 'user' + receiver.user_id
    }

    //emit message
    socket.emit('sendMessage', messageInfo)

    //write message to database - fetch post request.
    let url = `/api/chats/${chat_id}/new-message`
    let requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            user_id,
            chat_id
        })
    }

    fetch(url, requestOptions)
        .then(res => {
            if(res.status===200){
                console.log("message stored in database")
            } else {
                console.log("help...")
            }
        })
        .catch(err => console.log(err))

}




  return (
    <div className="chat-root">
      <div className="to-do">
      <h5>this is the beningging of the end</h5>
      <p>show a list of past chats (side tab / toggle)</p>
      <p>have a chat window open (bottom tab / toggle)</p>
      <p>have a input field to post a new message</p>
      <p>think of more functions</p>
      </div>
      <div className="chat-window">
        <div>Room name</div>
        <div className="message-board">Message</div>
        <form>
          <input type="text"/>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  )
}