import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './index.css'

export default function IntroBanner() {
  return (
    <Row className="intro-banner">
      <Col xs={12}>
        <h1>What we offer</h1>
      </Col>
      
      <Col xs={4}>explain to them</Col>
      <Col xs={4}>all bout our fancy</Col>
      <Col xs={4}>features•••</Col>
    </Row>
  )
}
