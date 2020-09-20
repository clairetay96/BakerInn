import React from 'react'

import { CardDeck, Button, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ListingDetail from '../../Components/ListingDetail'

export default function ListingDetailPage(props) {
  let history = useHistory()
  let { nextpage: next, allListings, edit } = props

  const handleBack = () => {
    history.push("/dashboard")
  }

  const handleNext = () => {
    history.push(`/dashboard/${next}`)
  }

  return (
    <>
      <Navbar bg="light" style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="light" onClick={handleBack}>Back</Button>
        <Button variant="light" onClick={handleNext}>{next}</Button>
      </Navbar>
      <CardDeck className="container" style={{ display: "flex", justifyContent: "start" }}>
        <ListingDetail allListings={allListings}
          edit={edit} />
      </CardDeck>
    </>
  )
}
