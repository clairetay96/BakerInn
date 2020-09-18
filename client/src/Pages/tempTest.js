import React, { useState, useEffect } from 'react'


let Test = ({ listingId }) => {

    const [listingDetails, setListingDetails] = useState({})

    //get listing information
    useEffect(()=>{

        const abortController = new AbortController()
        let url = "/api/listings/"+listingId

        fetch(url, { signal: abortController.signal })
            .then(res => res.json())
            .then(res => {
                setListingDetails(res)
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

    function submitHandler(event){
        event.preventDefault()

        let url = "/api/listings/"+listingId+"/interested"
        let requestOptions = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" }
        }

        fetch(url, requestOptions)
            .then(res=>res.text())
            .then(res=> {
                if(res.status===200){
                    console.log(res)
                } else {
                    console.log("panic!")
                }
            })
            .catch(err=> console.log(err))

    }



    return (
            <div>
            {listingDetails.item}, {listingDetails.price}, {listingDetails._id}
            <form onSubmit={submitHandler}>
                <input type="submit" value="express interest" />
            </form>
            </div>)

}

export default Test