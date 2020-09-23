import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './index.css'

export default function IntroBanner() {
  return (
    <div className="intro-banner">
      <Row >
        <Col className="intro-title" xs={12}>
          <h3>What we offer</h3>
          <p>need make fancy cards</p>
        </Col>

        <Col className="intro-cards" xs={4}>Share your extra items</Col>
        <Col className="intro-cards" xs={4}>Looking for something</Col>
        <Col className="intro-cards" xs={4}>Connect with the community</Col>
      </Row>
    </div>

  )
}
