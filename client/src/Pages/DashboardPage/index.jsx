import React, { Component } from 'react'


import ListingTabs from '../../Components/ListingTabs'
import SearchBar from '../../Components/SearchBar'

export default class DashboardPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      search: '',
      user: '5f6347cd5ed305cd33dda22f',
      userLendingListings: {
        available: [1,2,3,4,5],
        loan: [6,7,8,9,10],
      },
      userBorrowing: [11,12,13,14,15],
    }
  }

  componentDidMount() {
    this.pingServer()
    this.fetchUserBorrowesListing()
    this.fetchUserPostedListing()
  }

  pingServer = async () => {
    const res = await fetch('/api')
    const data = await res.text()
    console.log(data);
  }

  fetchUserPostedListing = async () => {
    const url = `/api/listings/user/${this.state.user}`;
    
    let res = await fetch(url)
    // res = await res.json()
    console.log(res);
  }

  fetchUserBorrowesListing = async () => {
    const url = `/api/listings/user/${this.state.user}/borrowed`;

    let res = await fetch(url)
    // res = await res.json()
    console.log(res);
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

        <SearchBar scope={"dashboard"}
                   onChange={this.handleChange}
                   onKeyUp={this.handleSearch}
                   value={this.state.search}/>

        <ListingTabs listingData={{...this.state.userLendingListings,
                                    userBorrowing: this.state.userBorrowing}}/>        
      </div>
    )
  }
}
