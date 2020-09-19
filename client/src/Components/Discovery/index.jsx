import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './index.css'

export default function Discovery() {
  return (
    <Row className="discovery">
      <Col xs={8}>
        Poster or carousel or smth eye catching here
      </Col>
      <Col xs={4}>
        <Col>
          Call to action goes here
        </Col>
        <Col>
          Call to action goes here
        </Col>
      </Col>
    </Row>
  )
}
