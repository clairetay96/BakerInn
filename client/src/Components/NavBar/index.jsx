import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import "./index.css"

class NavBar extends Component {
  constructor(props) {
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

      <div className="nav-header">
        <div>
          <Link to='/homepage'>
            <img className="logo" src="https://i.imgur.com/3RsoWX2t.png?2" alt="" />
          </Link>
        </div>

        <div>
          {isLoggedIn
            ? (<nav>
              <ul className="nav-links">
                <li><Link className="nav-items" to='/homepage'>Homepage</Link></li>
                <li><Link className="nav-items" to='/dashboard'>Dashboard</Link></li>
              </ul>
            </nav>
            )
            : <span className="nav-text">Keep calm and bake</span>}
        </div>

        <div>
          {isLoggedIn
            ? (<><span className="nav-textLogin" style={{ paddingRight: "40px" }}>Hi! <strong>{this.props.user}</strong></span><button className="nav-button" onClick={this.signout}>Sign out</button></>)
            : (<Link to="/login"><button className="nav-button">Log In</button></Link>)}
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar);

