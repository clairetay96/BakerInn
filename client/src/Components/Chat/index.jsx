import React from 'react'
import './index.css'

export default function Chat() {
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
        <div>
          <input></input>
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}
