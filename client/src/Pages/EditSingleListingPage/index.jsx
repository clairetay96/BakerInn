import React, { Component } from 'react'
import './index.css'

import { Col, Row } from 'react-bootstrap'

export default class EditSingleListingPage extends Component {
  render() {

    return (
      <div>
        <Row>
          <div className="border p-Icon">Icon here</div>
          <Col className="text-left">
            <h4>Lender name</h4>
            <p>more options?</p>
          </Col>
        </Row>
        <Row>
          <Col>
            Image here!
            <br />
            Edittttttttttt
          </Col>
          <Col>
            <h3>item name</h3>
            <p>detail 1</p>
            <p>detail 2</p>
            <p>detail 3</p>
            <p>detail 4</p>
            <p>detail 5</p>
            <button>Confirm</button>
            <button>Edit</button>
            <button>Delete</button>
          </Col>
        </Row>
      </div>
    )
  }
}
