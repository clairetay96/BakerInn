import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Login from "./Pages/LoginPage/"
import Register from "./Pages/RegisterPage/"
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import Chat from './Components/Chat';
import Auth from './Auth';
import ProtectedRoute from './Components/ProtectedRoute';
import { Container } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    }
  }

  loggedIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  signout = () => {
    this.setState({
      loggedIn: false
    })
  }

  loggedIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  componentDidMount() {
    // check on first opening if the user has logged in before
    // authenticate the token
    Auth.authenticate()
    .then(valid=>{
      this.setState({
        loggedIn: valid
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar isLoggedIn={this.state.loggedIn}
                  signout={this.signout}/>

          {/* conditionally render chat-overlay, show only when logged in */}
          { this.state.loggedIn
            ? (<Chat/>)
            : null 
          }
        <Container style={{marginTop: '66px'}}>
          <Route path="/signup" exact component={Register} />

          <Route path="/login" 
                exact 
                component={()=><Login loggedIn={this.loggedIn}/>} />
        
          {/* this route must protected */}
          <ProtectedRoute path="/dashboard">             
            <DashboardPage/>
          </ProtectedRoute>

          {/* this route must have protected actions*/}
          <Route path="/homepage">             
            <HomePage isLoggedIn={this.state.loggedIn}/>
          </Route>

          {/* redirect all non-specified routes. maybe have a 404 page*/}
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>
        </Container>
        </Router>
      </div>
    );
  }
}

export default App;