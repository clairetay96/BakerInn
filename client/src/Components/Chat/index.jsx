import React, { useState, useEffect } from 'react'
import './index.css'

export default function Chat({ chat_id, user_id, socket, onClose }) {
  //where chat_id is the chat_id and user_id is the logged in user_id


  ///////////////
  // debugging code here
  socket.on('disconnect', ()=>{
    console.log(chat_id, '-- chat dc');
  })


  const [error, setError] = useState(null)
  // end of debugging code
  ///////////////


  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([])
  const [messageHTML, setMessageHTML] = useState([])
  const [sender, setSender] = useState({}) //object containing user_id, username and whether this user is the owner of the item
  const [receiver, setReceiver] = useState({})
  const [listing, setListing] = useState({}) //object containing listing_id, listing name
  const [messageKey, setMessageKey] = useState(0)
  const [transactionOption, setTransactionOption] = useState(null)


  useEffect(()=>{
    //fetch chat users data/listing from database
    let abortController = new AbortController()
    fetch(`/api/chats/${chat_id}`, { signal: abortController.signal})
        .then(res=>res.json())
        .then(res => {
            console.log(res);
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

            console.log(res)

            setSender(
                {
                    user_id: sender_id,
                    isOwner: sender_id ===user_id,
                    username: sender_username
                })

            setReceiver(
                {
                    user_id: receiver_id,
                    isOwner: receiver_id===user_id,
                    username: receiver_username
                })

            setListing(
            {
                listing_id: res.listing_id,
                item: res.listing_item,
                option: res.listing_option,
                state: res.listing_state
            })

        })
        .catch(err => {
            setError('error detected')
            if(!abortController.signal.aborted){
                console.log(err)
            }
        })

        return () => {
            abortController.abort()
        }
  }, [])

  //fetch messages from the database
  useEffect(()=>{
    let abortController1 = new AbortController()
    //set messages state to contain messages.
    fetch(`/api/chats/${chat_id}/messages`, {signal: abortController1.signal})
        .then(res=> res.json())
        .then(res=> {
            setMessages(res)

            let messageHTMLtemp = res.map((message, index)=>{
                return <p key={message._id}><span>{message.sender_name}: </span>{message.message}</p>

            })

            setMessageHTML(messageHTMLtemp)

        })
        .catch(err=>{
            if(!abortController1.signal.aborted){
                console.log(err)
            }
        })

        return ()=>{
            abortController1.abort()
        }
  },[])

  useEffect(()=>{
    //socket to join chat room - emit
    socket.emit('join', { room_id: chat_id })
  }, [])


  useEffect(()=>{
    //socket to  receive message - on
    socket.on('receiveMessage' + chat_id, ( { message, sender_name } )=>{
        console.log(sender_name, '-- receive');

        setMessages( messages =>[...messages, { message, sender_name }])
        setMessageKey( messageKey => messageKey+1)
        setMessageHTML(messageHTML => [...messageHTML, <p key={messageKey}><span>{sender_name}: </span>{message}</p>])

    })

    return () => {
        socket.off('receiveMessage', ( { message, sender_name } )=>{

        setMessages( messages =>[...messages, { message, sender_name }])
        setMessageKey( messageKey => messageKey+1)
        setMessageHTML(messageHTML => [...messageHTML, <p key={messageKey}><span>{sender_name}: </span>{message}</p>])

    })
    }

  }, [])

  //populate the options available to the user - after setListing,setSender,setReceiver have been changed.
  useEffect(()=>{

    if(listing.state === "available"){
        if(listing.option=="loan"){
            //make button for loan on both ends

        } else if(listing.option=="sale"){
            //make button for seller to make the item "unavailable"/confirm transaction ie purchase has gone thru

        }

    } else if (listing.state==="unavailable") {
        //if the buyer in the chat is not the buyer in the database, notify

        //if buyer in the chat is buyer in the database, notify

    } else if (listing.state==="on loan"){
        //make button for returning on both ends


    }



  }, [sender, receiver, listing])

const sendMessage = (event) => {
    event.preventDefault()
    console.log(sender.username, '-- sendMessage');

    let messageInfo = {
        message,
        sender_name: sender.username,
        chatroom_id: chat_id,
        userroom_id: 'user' + receiver.user_id
    }

    //emit message
    socket.emit('sendMessage', messageInfo)

    //write message to database
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

    // set message to empty
    setMessage("")
}



//have option for buyer to make the listing unavailable (for purchasable items) - form submit
//emit notification that exchange has been made
//socket on to receive confirmation that exchange has been made
//update state in database to unavailable
function makeUnavailable()=>{

}

//for borrowable items.

//have option for buyer and seller to make the listing "on loan"  - form submit
//emit a loan confirmation - setState
//pending state OR loan confirmed
function agreeToLoan(event)=>{

}


//listen for a loan confirmation from opposite side -- use effect, socket on
//receive a loan confirmation - setState
useEffect(()=>{

}, [])


//update database from buyer side when both states are set - use effect, fetch request
useEffect(()=>{

}, [])




  const [toggle, setToggle] = useState(true)
  const toggleChat = () => {
    setToggle(!toggle)
  }


  return (
    <>
    <div className={toggle ? "chat-root" : "chat-root min-chat"}>
      <div className="chat-window">
        <button className="on-close"
                onClick={()=>onClose(chat_id)}>
            Close
        </button>
        <button onClick={toggleChat}>Minimize</button>
        <div className="on-close">{chat_id}</div>
        {error
         ? (<p>{error}</p>)
         : null
        }
        <div className="message-board">{messageHTML}</div>
        <form onSubmit={sendMessage}>
          <input type="text" value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
    </>
  )
}