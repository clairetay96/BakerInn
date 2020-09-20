import React, { Component } from 'react'

import ListingTabs from '../../Components/ListingTabs'
import SearchBar from '../../Components/SearchBar'
import ListingDetailPage from '../../Pages/ListingDetailPage';
import EditSingleListingPage from '../../Pages/EditSingleListingPage';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

export default class DashboardPage extends Component {


  constructor(props) {
    super(props);

    this.state = {
      search: '',
      user: props.userId,
      userLendingListings: {
        available: [],
        loan: [6, 7, 8, 9, 10],
      },
      userBorrowing: [11, 12, 13, 14, 15],
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
    console.log("pingserver", data);
  }

  fetchUserPostedListing = async () => {
    const url = `/api/listings/user/${this.state.user}`;

    let res = await fetch(url)
    let userListings = await res.json()

    this.setState((prevState) => ({
      userLendingLists: prevState.userLendingListings.available = userListings
    }))

    console.log("USERLISTING", userListings)

  }

  fetchUserBorrowesListing = async () => {
    const url = `/api/listings/user/${this.state.user}/borrowed`;

    let res = await fetch(url)
    // let borrowedListing = await res.json()

    // console.log(borrowedListing);
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    })
  }

  handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      console.log(this.state.search);
      this.setState({
        search: '',
      })
    }
  }

  render() {
    console.log("UPDATED AVAIBLE", this.state.userLendingListings.available)
    return (
      <div>
        <h1>Welcome back User</h1>

        <SearchBar scope={"dashboard"}
          onChange={this.handleChange}
          onKeyUp={this.handleSearch}
          value={this.state.search} />
        <Switch>
          <ProtectedRoute exact path="/dashboard">
            <ListingTabs listingData={{
              ...this.state.userLendingListings,
              userBorrowing: this.state.userBorrowing
            }} />
          </ProtectedRoute>
          <Route path="/dashboard/borrowing">
            <ListingDetailPage allListings={this.state.userBorrowing}
              nextpage={"lending"}
              edit={false} />
          </Route>
          <Route path="/dashboard/lending">
            <ListingDetailPage allListings={this.state.userLendingListings.loan}
              nextpage={"borrowing"}
              edit={true} />
          </Route>
          <Route path="/dashboard/listing/:id">
            <EditSingleListingPage />
          </Route>

        </Switch>

      </div>
    )
  }
}
