import React, { useEffect, useState } from 'react'
import Chat from '../Chat'
import './index.css'

export default function ChatContainer({ socket }) {

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

  // track addition of more chatroom
  let [activeChat, setActiveChat] = useState([])
  
  // populate active chat
  const handleAddWindow = () => {
    let chats = allChats.map((chat,index) => {
      return (<Chat key={index} chat_id={chat} user_id={user_id} socket={socket}/>)
    })
    setActiveChat(chats)
  }

  // helper function to return desired rendering
  let [allChats, setAllChats] = useState(null)

  const allChatsHelper = () => {
    if (!allChats) {
      return 'loading spinner should exist here'
    } else {
      if (allChats.length > 0) {
        let output = allChats.map((chat, index)=>{
            return (<li key={index}>chat</li>)
        })
        return output
      } else {
        return 'U hav no frens how sad :('
      }    
    }
  }

  // handle the opening and closing of tabs

  //

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h4>List of all chats</h4>
        <ul>
          {allChatsHelper()}
        </ul>
      <button onClick={handleAddWindow}>Magic button</button>
      </div>
      { activeChat }
    </div>
  )
}
