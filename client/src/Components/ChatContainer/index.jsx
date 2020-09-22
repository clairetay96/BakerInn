import React, { useEffect, useState } from 'react'
import Chat from '../Chat'
import './index.css'
import { Spinner } from 'react-bootstrap'
import {ReactComponent as ChatIcon} from '../../chat.svg'
import {ReactComponent as MiniIcon} from '../../minimize.svg'

export default function ChatContainer({ socket, newChatData, clearChatData }) {

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

        //get data for each chat
        let allChatData = res.chats.map((chat_id, index)=>{
            return fetch(`/api/chats/${chat_id}`)
                    .then(res => res.json())
                    .catch(err => {throw err})
        })

        return Promise.all(allChatData)

      } else {
        setAllChats([])
        return null
      }
    })
    .then(res1 => {
        if(res1){
            setAllChats(res1)
        }
    })
    .catch(err=>{
      console.log(err)
      setAllChats([])
    })
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


      setToggle(true)

      const url = `/api/chats/find/${newChatData.owner_id}/${newChatData._id}`
      fetch(url)
      .then(res=>{
        if(res.status===404){
            return null
        } else {
            return res.json()
        }

      })
      .then(res=> {

        if (!res) {
          // create new in db
          console.clear();
          console.log(allChats,"--make a new chat if chat doesn't exist")

          let newChatURL = '/api/chats/new'
          let requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                listing_id: newChatData._id,
                owner_id: newChatData.owner_id

            })
          }

          fetch(newChatURL, requestOptions)
            .then(res => res.json())
            .then(res => {

                let newChatID = res.insertedId

                let chatInfoURL = "/api/chats/"+newChatID

                return fetch(chatInfoURL)
            })
            .then(res => res.json())
            .then(res => {

                // add new chat in allchats
                setAllChats([...allChats, res])

                // open new chat window
                setActiveChat([...activeChat, res._id])


            })
            .catch(err => {console.log(err)})


          console.log('create new chat room everywhere')
        } else {
          // open chat window

          console.log(res, '-- fetch chat');
          let { _id, listing_id, owner_id, buyer_id } = res
          console.log(allChats, "---chat exists, open")
          setActiveChat([...activeChat, _id])
        }

        console.log(allChats, "---Do nothing because chat is open")

      })
      .catch(err=>{
        console.log(err);
      })
    }

    clearChatData()
    // for debug
    if (newChatData) {
      console.log('lets make a newChat room from: ')
      console.log(newChatData);
    }
  }, [newChatData])

  // track addition of more chatrooms from list
  const [activeChat, setActiveChatWindow] = useState([])
  
  // helper to limit number of chat windows
  const setActiveChat = (arr) => {
    if (arr.length > 3) {
      // remove the lastest
      arr.splice(0,1)
      setActiveChatWindow(arr)
    } else {
      setActiveChatWindow(arr)
    }
  }

  // populate active chat
  const handleAddWindow = (id) => {
    // take the id of the chat

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

  const allChatsHelper = (_allChats) => {
    if (!_allChats) {
      return (<Spinner style={{margin: '0 auto'}} animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>)
    } else {
      if (_allChats.length > 0) {
        let output = _allChats.map((chat, index)=>{

            return (<div onClick={()=>handleAddWindow(chat._id)}
                        className="chat-list-item"
                        key={index}>
                        <div className="chat-container-username">
                        {user_id===chat.owner_id ? chat.buyer_username : chat.owner_username}
                        </div>
                        <div className="chat-container-listing">
                         for {chat.listing_item}
                        </div>
                    </div>)
        })
        return output
      } else {
        return 'U hav no frens how sad :('
      }
    }
  }

  const [toggle, setToggle] = useState(false)

  const toggleChat = () => {
    setToggle(!toggle)
  }

  return (
    <>
    <div onClick={toggleChat} className="show-container"><ChatIcon /></div>
    <div className={toggle ? "chat-container" : "chat-container hide-container"}>
      <div className="chat-list">
        <button onClick={toggleChat}><MiniIcon/></button>
        <h4>BakerInn Chats</h4>
          {allChatsHelper(allChats)}
      </div>
      { renderActive }
    </div>
    </>
  )
}