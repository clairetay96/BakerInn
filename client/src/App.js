import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';

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
       <NavBar isLoggedIn={this.state.loggedIn}/>
      </div>
    );
  }
}

export default App;

