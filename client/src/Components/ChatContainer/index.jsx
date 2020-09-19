import React, { useEffect, useState } from 'react'
import './index.css'

export default function ChatContainer() {

  const cookie = document.cookie
  const user_id = JSON.parse(atob(cookie.split(".")[1])).userId

  // add more chats when the user clicks on the chat button
  // initialize the list of chats when first rendered

  // show loading when the chats are loading
  let [allChats, setAllChats] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${user_id}`)
    .then(res=> res.json())
    .then(res=>{
      console.log(res);
      setAllChats(res.chats)
    })
    .catch(err=>console.log(err))
  }, [])

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h4>List of all chats</h4>
        <ul>
          {allChats}
        </ul>
      </div>
    </div>
  )
}
