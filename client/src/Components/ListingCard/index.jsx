import React from 'react'
import { Card } from 'react-bootstrap'

export default function ListingCard(props) {
  return (
    <>
      <Card style={{ margin: "15px" }}>
        <Card.Img variant="top" src="https://bakingamoment.com/wp-content/uploads/2019/02/IMG_2757-croissant-recipe-easy-500x500.jpg" style={{ height: "300px", width: "300px" }} />
        <Card.Body>
          <Card.Title>LISTING TITLE</Card.Title>
          <Card.Text>
            I am a card for {props.listing}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">FOR RENT</small>
        </Card.Footer>
      </Card>
    </>
  )
}
