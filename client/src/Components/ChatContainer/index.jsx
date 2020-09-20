import React, { useEffect, useState } from 'react'
import Chat from '../Chat'
import './index.css'

export default function ChatContainer({ socket, newChatData }) {

  const cookie = document.cookie
  const user_id = JSON.parse(atob(cookie.split(".")[1])).userId

  // add more chats when the user clicks on the chat button
  // initialize the list of chats when first rendered

  // show loading when the chats are loading

  // one time fetch for existing chatroom
  useEffect(() => {
    fetch(`/api/users/${user_id}`)
    .then(res=> res.json())
    .then(res=>{
      if (res.chats){
        setAllChats(res.chats)
      } else {
        setAllChats([])
      }
    })
    .catch(err=>console.log(err))
  }, [])

  // track creation of rooms from single lising page
  useEffect(()=>{
    // info from single listing page
    // -- seller id
    // -- listing id

    // info from the token
    // -- user id

    // how to handle if the user clicks on his own chat???
    // current limitation if the chat button is clicked twice it cant register
    // a change in the newChatData
    // no new chat window is opened

    // if data exist then run this
    if (newChatData) {
      const url = `/api/chats/find/${newChatData.owner_id}/${newChatData._id}`

      fetch(url)
      .then(res=>res.json())
      .then(res=>{
        console.log(res, '-- fetch chat');
        let { _id, listing_id, owner_id, buyer_id } = res

        if (!activeChat.includes(_id) && !allChats.includes(_id)) {
          // create new in db
          // add new chat in allchats
          // open new chat window
          console.log('create new chat room everywhere')
        } else if (allChats.includes(_id)) {
          // open new chat window
          setActiveChat([...activeChat, _id])
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }

    // for debug
    if (newChatData) {
      console.log('lets make a newChat room from: ')
      console.log(newChatData);
    }
  }, [newChatData])

  // track addition of more chatrooms from list
  const [activeChat, setActiveChat] = useState([])
  
  // populate active chat
  const handleAddWindow = (e) => {
    e.preventDefault()
    // take the id of the chat
    let id = e.target.id

    if (activeChat.includes(id)) {
      return // do nothing
    }

    // add it to the active chats
    setActiveChat([...activeChat, id])
  }

  //rerender 
  const [renderActive, setRenderActive] = useState([])
  useEffect(() => {
    setRenderActive(activeChat.map((id) => {
      return (<Chat chat_id={id} 
                        key={id}
                        user_id={user_id} 
                        onClose={handleDeleteWindow}
                        socket={socket}/>)
    }))
  },[activeChat])

  // delete when you click on x
  const handleDeleteWindow = (id) => {
    let filter = activeChat.filter((item) => {
        console.log(item, '-- item');
        return item !== id
    })

    setActiveChat(filter)
  }

  // helper function to return desired rendering
  let [allChats, setAllChats] = useState(null)

  const allChatsHelper = () => {
    if (!allChats) {
      return 'loading spinner should exist here'
    } else {
      if (allChats.length > 0) {
        let output = allChats.map((chat, index)=>{
            return (<div onClick={handleAddWindow} 
                        id={chat} 
                        className="chat-list-item"
                        key={index}>
                        chat
                    </div>)
        })
        return output
      } else {
        return 'U hav no frens how sad :('
      }    
    }
  }

  const [toggle, setToggle] = useState(true)

  const toggleChat = () => {
    setToggle(!toggle)
  }

  return (
    <>
    <button onClick={toggleChat} className="show-container">Show chat</button>
    <div className={toggle ? "chat-container" : "chat-container hide-container"}>
      <div className="chat-list">
        <button onClick={toggleChat}>minimize</button>
        <h4>BakerInn Chats</h4>
          {allChatsHelper()}
      </div>
      { renderActive }
    </div>
    </>
  )
}
