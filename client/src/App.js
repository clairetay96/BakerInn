import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Login from "./Pages/LoginPage/"
import Register from "./Pages/RegisterPage/"
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import SearchResults from './Pages/SearchResultsPage';
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
      socket: null,
      newChatData: null,
      username: null,
      userId: null
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
      socket: null,
      username: null
    })
  }

  loggedIn = () => {
    const cookie = document.cookie
    const username = JSON.parse(atob(cookie.split(".")[1])).username
    const userId = JSON.parse(atob(cookie.split(".")[1])).userId

    let socket = this.setupSocket()
    this.setState({
      loggedIn: true,
      socket: socket,
      username: username,
      userId: userId
    })
  }

  createChat = (data) => {
    this.setState({
      newChatData: data
    })
  }

  clearChatData = () => {
    this.setState({
        newChatData: null
    })
  }

  componentDidMount() {

    // check on first opening if the user has logged in before
    // authenticate the token
    Auth.authenticate()
      .then(valid => {
        if (valid) {
          const cookie = document.cookie
          const username = JSON.parse(atob(cookie.split(".")[1])).username
          const userId = JSON.parse(atob(cookie.split(".")[1])).userId
          console.log(userId)

          let socket = this.setupSocket(username)
          this.setState({
            loggedIn: valid,
            socket: socket,
            username: username,
            userId: userId
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
  setupSocket = (username) => {

    //query to send the username
    const ENDPOINT = "localhost:5000"
    let socket = io(ENDPOINT, { query: `username=${username}` })
    socket.on('connect', () => {
      console.log(username, 'connected');
    })
    return socket
  }



  render() {
    return (
      <div className="App">
        <Router>
          <NavBar isLoggedIn={this.state.loggedIn}
            user={this.state.username}
            signout={this.signout} />

          {/* conditionally render chat-overlay, show only when logged in */}
          {this.state.loggedIn
            ? (<ChatContainer socket={this.state.socket}
              newChatData={this.state.newChatData}
              clearChatData={this.clearChatData}/>)
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
              <HomePage isLoggedIn={this.state.loggedIn}
                createChat={this.createChat} />
            </Route>

            <Route exact path="/search">
              <SearchResults />
            </Route>

            {/* blank page for testing*/}
            <Route path="/test">
              <Test listingId="5f670aebb063fffb5a0d183f" socket={this.state.socket}/>
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