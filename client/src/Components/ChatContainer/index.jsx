import React, { useEffect, useState } from 'react'
import './index.css'

export default function ChatContainer() {

  const cookie = document.cookie
  const user_id = JSON.parse(atob(cookie.split(".")[1])).userId

  // add more chats when the user clicks on the chat button
  // initialize the list of chats when first rendered

  // show loading when the chats are loading
  let [allChats, setAllChats] = useState(null)

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

  // helper function to return desired rendering
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

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h4>List of all chats</h4>
        <ul>
          {allChatsHelper()}
        </ul>
      </div>
    </div>
  )
}
