import React from 'react'
import { Link } from 'react-router-dom';
import ListingCard from '../ListingCard'

export default function ListingDetail(props) {
  let { edit } = props;
  let path = edit ? "/dashboard/listing/" : "/homepage/listing/"

  // link path needs to be updated to be using item id
  return (
    <div>
      {props.allListings 
      ? props.allListings.map((listing, index)=>{
          return (
            <Link key={index} to={`${path}${listing}`}>
              <ListingCard listing={listing}/>
            </Link>
          )
        }) 
      : "nothing to show here"}
    </div>
  )
}
