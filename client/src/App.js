import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import Login from "./Pages/LoginPage/"
import Register from "./Pages/RegisterPage/"
import Test from "./Pages/TestPage"


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <p><Link to="/signup">Sign Up</Link></p>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/test">Test</Link></p>

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