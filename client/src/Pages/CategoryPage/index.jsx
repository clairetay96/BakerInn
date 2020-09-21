import React from 'react'
import { CardDeck } from 'react-bootstrap'
import ListingDetail from '../../Components/ListingDetail'

export default function CategoryPage({listings}) {
  return (
    <div>
      <h4>All listings for one category</h4>
      <CardDeck>
        <ListingDetail allListings={listings}/>
      </CardDeck>
    </div>
  )
}
