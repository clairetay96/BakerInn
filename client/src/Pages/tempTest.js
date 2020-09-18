import React, { useState, useEffect } from 'react'
import Chat from '../Components/Chat'

let Test = ({ listingId }) => {

    const [listingDetails, setListingDetails] = useState({})
    const [isInterested, setInterest] = useState(false)
    const [chatId, setChatId] = useState(null)
    const cookie = document.cookie
    const user_id = JSON.parse(atob(cookie.split(".")[1])).userId

    //get listing information
    useEffect(()=>{

        const abortController = new AbortController()
        let url = "/api/listings/"+listingId

        fetch(url, { signal: abortController.signal })
            .then(res => res.json())
            .then(res => {
                setListingDetails(res)
                if(res.interested.includes(user_id)){
                    setInterest(true)
                }
            })
            .catch(err => {
                if(!abortController.signal.aborted){
                    console.log(err)
                }
                })


            return ()=>{
                abortController.abort()
            }

    }, [])

    //get chatID if the buyer is already interested.
    useEffect(()=>{
        const abortController1 = new AbortController()
        let url1 = "/api/chats/find/"+listingDetails.owner_id+"/"+listingDetails._id
        let requestOptions1 = {
            signal: abortController1.signal
        }

        fetch(url1, requestOptions1)
            .then(res => {
                if(res.status===200){
                    return res.json()
                } else if (res.status===500) {
                    console.log("Server error!")
                } else {
                    console.log("What's happening!!")
                }
            })
            .then(res=> {
                setChatId(res._id)
            })
            .catch(err => {
                if(!abortController1.signal.aborted){
                    console.log(err)
                }
            })

        return () => {
            abortController1.abort()
        }

    }, [isInterested])

    let interestOrChat = isInterested ? (<div><Chat chat_id="5f64e3458901a9cef67d55c5"/></div>) : (<form onSubmit={submitHandlerInterest}><input type="submit" value="express interest" /></form>)

    //only allow user access to this function if user_id is not in 'interested' of listing.
    function submitHandlerInterest(event){
        event.preventDefault()

        //add user to 'interested' of the listing
        let url = "/api/listings/"+listingId+"/interested"
        let requestOptions = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" }
        }

        fetch(url, requestOptions)
            .then(res=> {
                if(res.status===200){
                    console.log(res)
                } else if (res.status===500) {
                    console.log("panic!")
                }
            })
            .catch(err=> console.log(err))

        //make a new chat

        let makeChatUrl = "/api/chats/new"
        let chatRequestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                listing_id: listingDetails._id,
                owner_id: listingDetails.owner_id,
            })
        }

        fetch(makeChatUrl, chatRequestOptions)
            .then(res => {
                if(res.status===200){
                    console.log(res)
                } else if(res.status===500){
                    console.log("chat not made?!")
                } else {
                    console.log("help")
                }

            })
            .catch(err => console.log(err))
    }





    return (
            <div>
            {listingDetails.item}, {listingDetails.price}, {listingDetails._id}
            {interestOrChat}

            </div>)

}

export default Test