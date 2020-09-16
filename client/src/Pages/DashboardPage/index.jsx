import React, { Component } from 'react'
import { Tab, Tabs } from "react-bootstrap";
import './index.css'

export default class DashboardPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      search: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    })  
  }

  handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value !== ''){
      console.log(this.state.search);
      this.setState({
        search: '',
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome back User</h1>

        <div className="search">
          <input onChange={this.handleChange}
                 onKeyUp={this.handleSearch}
                 value={this.state.search}/>
        </div>

        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="listing-tabs">
          <Tab eventKey="home" title="Listing Status">
            Links to user borrowing from other users and user lending to other users
          </Tab>
          <Tab eventKey="profile" title="My Listing">
            User posted listing that is available
          </Tab>
        </Tabs>
      </div>
    )
  }
}
