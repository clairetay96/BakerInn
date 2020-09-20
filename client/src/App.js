import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Login from "./Pages/LoginPage/"
import Register from "./Pages/RegisterPage/"
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import Auth from './Auth';
import ProtectedRoute from './Components/ProtectedRoute';
import { Container } from 'react-bootstrap';
import Footer from './Components/Footer';
import Test from './Pages/TestPage';
import ChatContainer from './Components/ChatContainer';
import io from 'socket.io-client'


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      socket: null
    }
  }

  loggedIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  // change state
  // close socket
  // delete all personalised content
  // remove token
  signout = () => {
    this.state.socket.close()
    console.log('user disconnected');
    this.setState({
      loggedIn: false,
      socket: null
    })
  }

  loggedIn = () => {
    let socket = this.setupSocket()
    this.setState({
      loggedIn: true,
      socket: socket
    })
  }

  componentDidMount() {
    // check on first opening if the user has logged in before
    // authenticate the token
    Auth.authenticate()
      .then(valid => {
        if (valid) {
          let socket = this.setupSocket()
          this.setState({
            loggedIn: valid,
            socket: socket
          })
        } else {
          this.setState({
            loggedIn: valid
          })
        }
      })
      .catch(err => console.log(err, '-- authenticate'))
  }

  // open socket only when authenticated and logged in
  // check when app opens
  // check when user logs in
  setupSocket = () => {
    const ENDPOINT = "localhost:5000"
    let socket = io(ENDPOINT)
    socket.on('connect', () => {
      console.log('user connected');
    })
    return socket
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar isLoggedIn={this.state.loggedIn}
            signout={this.signout} />

          {/* conditionally render chat-overlay, show only when logged in */}
          {this.state.loggedIn
            ? (<ChatContainer socket={this.state.socket} />)
            : null
          }
          <Container style={{ marginTop: '66px', textAlign: "center" }}>
            <Route path="/signup" exact component={Register} />

            <Route path="/login"
              exact
              component={() => <Login loggedIn={this.loggedIn} />} />

            {/* this route must protected */}
            <ProtectedRoute path="/dashboard">
              <DashboardPage />
            </ProtectedRoute>

            {/* this route must have protected actions*/}
            <Route path="/homepage">
              <HomePage isLoggedIn={this.state.loggedIn} />
            </Route>

            {/* blank page for testing*/}
            <Route path="/test">
              <Test />
            </Route>

            {/* redirect all non-specified routes. maybe have a 404 page*/}
            <Route exact path="/">
              <Redirect to="/homepage" />
            </Route>
            <Footer />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;

