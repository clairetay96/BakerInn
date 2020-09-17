import React from 'react'

export default function ListingDetail(props) {
  return (
    <div>
      {props.allListings 
      ? props.allListings.map((listing, index)=>{
          return <h1 key={index}>{listing}</h1>
        }) 
      : "nothing to show here"}
    </div>
  )
}
