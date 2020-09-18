import React from 'react';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Login from "./Pages/LoginPage/"
import Register from "./Pages/RegisterPage/"
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import Chat from './Components/Chat';
import Auth from './Auth';
import AddListingPage from './Pages/AddListingPage'

class App extends React.Component {
  constructor() {
    super();

    // logged in is used for placeholder
    // use proper auth to validate user
    // placeholder user data, need to fetch data on component mount
  }

  componentDidMount() {
    // check if user is logged in
    this.setState({
      loggedIn: true,
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar isLoggedIn={Auth.authenticate(null)} />

          {/* conditionally render chat-overlay, show only when logged in */}
          {Auth.authenticate(null)
            ? (<Chat />)
            : null
          }

          <Route path="/signup" exact component={Register} />
          <Route path="/login" exact component={Login} />

          {/* this route must protected */}
          <Route path="/dashboard">
            <DashboardPage />
          </Route>

          {/* this route must have protected actions*/}
          <Route path="/homepage">
            <HomePage isLoggedIn={Auth.authenticate(null)} />
          </Route>

          {/* redirect all non-specified routes. maybe have a 404 page*/}
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>


        </Router>

        <AddListingPage />
      </div>
    );
  }
}

export default App;

