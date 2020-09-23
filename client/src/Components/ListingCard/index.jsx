import React from 'react'
import { Card } from 'react-bootstrap'

export default function ListingCard({ listing: { item, description, option, owner_info } }) {
  // console.log("LISTING CARD", props)
  return (
    <>
      <Card style={{ margin: "15px" }}>
        <Card.Img variant="top" src="https://bakingamoment.com/wp-content/uploads/2019/02/IMG_2757-croissant-recipe-easy-500x500.jpg" style={{ height: "300px", width: "300px" }} />
        <Card.Body>
          <Card.Title> <h3>{item}</h3></Card.Title>
          <Card.Text style={{ color: "grey" }}>
            {description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">For {option}</small>
        </Card.Footer>
      </Card>
    </>
  )
}