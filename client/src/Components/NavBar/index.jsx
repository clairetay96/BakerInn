import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {
  constructor(props){
    super(props)
  }

  signout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    this.props.signout()
    this.props.history.push('/homepage')
  }

  render() {
    let { isLoggedIn } = this.props;

    return (
      <Navbar bg="dark" variant="dark" fixed="top">
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
            {isLoggedIn 
              ? (<>Hi! {this.props.user} <button onClick={this.signout}>Sign out</button></>) 
              : (<Link to="/login">Log In</Link>)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(NavBar);