import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import DashboardPage from './Pages/DashboardPage';
import { Route } from 'react-router-dom'

class App extends React.Component {
  constructor(){
    super();

    // logged in is used for placeholder
    // use proper auth to validate user
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
        
        {/* always show the nav */}
        <NavBar isLoggedIn={this.state.loggedIn}/>

        <Route path="/dashboard">             
          <DashboardPage/>
        </Route>
      </div>
    );
  }
}

export default App;
