import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

export default class SingleListingPage extends Component {
  render() {

    // layout the page
    //
    return (
      <div>
        <Row>
          Lender details
        </Row>
        <Row>
          <Col>
            Image here
          </Col>
          <Col>
            Item details here
          </Col>
        </Row>
        <Row>
          Related items/ other items the lender has to offer
        </Row>
      </div>
    )
  }
}
