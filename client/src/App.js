import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import { Route, Redirect } from 'react-router-dom'
import HomePage from './Pages/HomePage';

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

  render(){
    return (
      <div className="App">
        
        {/* always show the overlays 1. nav 2. chat 3. add listing? */}
        <NavBar isLoggedIn={this.state.loggedIn}/>

        <Route path="/dashboard">             
          <DashboardPage/>
        </Route>
        <Route path="/homepage">             
          <HomePage isLoggedIn={this.state.loggedIn}/>
        </Route>

        <Route exact path="/">
          <Redirect to="/homepage" />
        </Route>
      </div>
    );
  }
}

export default App;

