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
  let [renderActive, setRenderActive] = useState([])
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
            return (<li onClick={handleAddWindow}
                        id={chat}
                        key={index}>
                        chat
                    </li>)
        })
        return output
      } else {
        return 'U hav no frens how sad :('
      }
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h4>List of all chats</h4>
        <ul>
          {allChatsHelper()}
        </ul>
      </div>
      { renderActive }
    </div>
  )
}