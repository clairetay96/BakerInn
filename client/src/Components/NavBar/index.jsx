import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

export default class NavBar extends Component {
  render() {
    let { isLoggedIn } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          BakeInn
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn ? "Icon" : "Log In"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
