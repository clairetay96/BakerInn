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
import AddListingPage from './Pages/AddListingPage'
import ProtectedRoute from './Components/ProtectedRoute';
import Test from './Pages/tempTest'
import Test2 from './Pages/tempTest2'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    }

    // logged in is used for placeholder
    // use proper auth to validate user
    // placeholder user data, need to fetch data on component mount
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

  componentDidMount() {
    // check on first opening if the user has logged in before
    // authenticate the token
    Auth.authenticate((log) => {
      this.setState({
        loggedIn: log
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
        {/* this.state.loggedIn
          ? (<Chat/>)
          : null
        */}

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

        <Route path="/test">
            <Test listingId="5f658546a4be83df4ea3f41d"/>
        </Route>

        <Route path="/test2">
            <Test2 listingId="5f658546a4be83df4ea3f41d"/>
        </Route>

          {/* redirect all non-specified routes. maybe have a 404 page*/}
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>

          <Route path="/add-listing">
          <AddListingPage />
          </Route>


        </Router>


      </div>
    );
  }
}

export default App;