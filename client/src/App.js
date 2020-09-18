import React from 'react';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Login from "./Pages/LoginPage/"
import Register from "./Pages/RegisterPage/"
import Test from "./Pages/TestPage"
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import Chat from './Components/Chat';

class App extends React.Component {
  constructor(){
    super();

    // logged in is used for placeholder
    // use proper auth to validate user
    // placeholder user data, need to fetch data on component mount
    this.state = {
      loggedIn : false,
    }
  }

  componentDidMount(){
    // check if user is logged in
    this.setState({
      loggedIn: true,
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar isLoggedIn={this.state.loggedIn}/>
          <p><Link to="/signup">Sign Up</Link></p>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/test">Test</Link></p>


        {/* conditionally render chat-overlay, show only when logged in */}
        { this.state.loggedIn
          ? (<Chat/>)
          : null 
        }

        {/* this route must protected */}
        <Route path="/dashboard">             
          <DashboardPage/>
        </Route>

        {/* this route must have protected actions*/}
        <Route path="/homepage">             
          <HomePage isLoggedIn={this.state.loggedIn}/>
        </Route>

        {/* redirect all non-specified routes. maybe have a 404 page*/}
        <Route exact path="/">
          <Redirect to="/homepage" />
        </Route>

          <Switch>
            <Route path="/signup" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/test" exact component={Test} />
          </Switch>
      
      
        </Router>
      </div>
    );
  }
}

export default App;

