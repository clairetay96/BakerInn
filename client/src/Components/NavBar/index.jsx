import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    let { isLoggedIn } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        <Link to='/homepage'>
          <Navbar.Brand>
            BakeInn
          </Navbar.Brand>
        </Link>
        {isLoggedIn 
         ? (<Nav>
              <Link to='/dashboard'>Dashboard</Link>
              <Link to='/homepage'>Homepage</Link>
            </Nav>)
         : null}
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn ? "Icon Sign Out" : "Log In"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
