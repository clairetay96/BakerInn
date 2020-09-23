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
         ? (<Nav variant="pills" defaultActiveKey={this.props.location.pathname.split('/')[0]}>
              <Nav.Item>
                <Nav.Link as="div" href="homepage" style={{padding: "0 0.5em"}}>              
                  <Link className="nav-link" style={{color: "lightgrey"}} to='/homepage'>Homepage</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div" eventKey="dashboard" style={{padding: "0 0.5em"}}>
                  <Link className="nav-link" style={{color: "lightgrey"}} to='/dashboard'>Dashboard</Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            )
         : null}
        <Navbar.Collapse className="justify-content-end">
            {isLoggedIn 
              ? (<><Navbar.Text className="mr-2">Hi! {this.props.user}</Navbar.Text><button onClick={this.signout}>Sign out</button></>) 
              : (<Link to="/login"><button>Log In</button></Link>)}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(NavBar);

