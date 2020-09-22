import React, { useEffect, useState } from 'react'
import { useLocation, withRouter, useHistory } from 'react-router-dom'
import './index.css'
import SearchBar from '../../Components/SearchBar'


function SearchResults({ user_results, listing_results }) {
    let history = useHistory()
    let query = new URLSearchParams(useLocation().search)
    let searchQueryTemp = query.get("q")

    let [searchQuery, setSearchQuery] = useState(searchQueryTemp)
    let [listingsHTML, setListingsHTML] = useState(null)
    let [usersHTML, setUsersHTML] = useState(null)
    let [searchBarValue, setSearchBarValue] = useState(searchQuery)

    useEffect(()=>{

      let searchListingsUrl="/api/search/listings?q="+searchQuery
      let searchUsersUrl="/api/search/users?q="+searchQuery

      fetch(searchListingsUrl)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            let listingsHTMLTemp = res.map((item)=>{
                return (<div className="indiv-listing-search-result" onClick={()=>{goToListingsPage(item._id)}}>
                    <h5>{item.item}</h5>
                    ${item.price}, {item.state}, {item.option}
                    <p>{item.description}</p>
                    </div>)
            })

            if(listingsHTMLTemp.length==0){
                listingsHTMLTemp = "No listings match your search."
            }

            setListingsHTML(listingsHTMLTemp)

        })

      fetch(searchUsersUrl)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            let usersHTMLTemp = res.map((item)=>{
                return (<div>{item.username}</div>)
            })

            if(usersHTMLTemp.length==0){
                usersHTMLTemp = "No users match your search."
            }

            setUsersHTML(usersHTMLTemp)

        })

    }, [searchQuery])

    function handleSearch(event) {
        if(event.keyCode===13&&event.target.value){
            history.push("/search?q="+searchBarValue)
            setSearchQuery(event.target.value)
        }
    }

    function goToListingsPage(listing_id){
        history.push("/homepage/listing/"+listing_id)

    }

    return (<div>
                <SearchBar onChange={(e)=>{setSearchBarValue(e.target.value)}} onKeyUp={handleSearch} value={searchBarValue}/>
                <div className="search-results">
                <h3>Users</h3>
                {usersHTML}
                </div>
                <div className="search-results">
                <h3>Listings</h3>
                {listingsHTML}
                </div>
            </div>)







}


export default withRouter(SearchResults)