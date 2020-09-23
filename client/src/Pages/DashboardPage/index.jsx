import React, { Component } from 'react'

import ListingTabs from '../../Components/ListingTabs'
import SearchBar from '../../Components/SearchBar'
import ListingDetailPage from '../../Pages/ListingDetailPage';
import EditSingleListingPage from '../../Pages/EditSingleListingPage';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

export default class DashboardPage extends Component {

  constructor() {
    super();

    // retrieve userID in cookie
    const cookie = document.cookie
    let userId = ""
    if (cookie) {
      userId = JSON.parse(atob(cookie.split(".")[1])).userId
    }


    this.state = {
      userId: userId,
      userLendingListings: {
        available: [],
        loan: [],
      },
      userBorrowing: []
    }
  }

  componentDidMount() {
    this.pingServer()
    this.fetchUserBorrowesListing()
    this.fetchUserPostedListing()
    this.fetchUserLendingListing()
  }

  pingServer = async () => {
    const res = await fetch('/api')
    const data = await res.text()
    console.log("pingserver", data);
  }

  fetchUserPostedListing = async () => {
    const url = `/api/listings/user/${this.state.userId}`;

    let res = await fetch(url)
    let userListings = await res.json()

    this.setState((prevState) => ({
      userLendingLists: prevState.userLendingListings.available = userListings
    }))

    console.log("USERLISTING", userListings)

  }

  fetchUserBorrowesListing = async () => {
    const url = `/api/listings/user/${this.state.userId}/borrowed`;

    let res = await fetch(url)
    let borrowedListings = await res.json()

    this.setState((prevState) => ({
      userBorrowing: prevState.userBorrowing = borrowedListings
    }))

    console.log("USER BORROW LISTING", borrowedListings)

  }

  fetchUserLendingListing = async () => {
    const url = `/api/listings/user/${this.state.userId}/loan`;

    let res = await fetch(url)
    let loanListings = await res.json()

    this.setState((prevState) => ({
      userLendingLists: prevState.userLendingListings.loan = loanListings
    }))

    console.log("USER LOAN LISTING", loanListings)

  }

  render() {
    console.log("UPDATED AVAIBLE", this.state.userLendingListings.available)
    return (
      <div>
        <h1>Welcome back User</h1>
        
        <Switch>
          <ProtectedRoute exact path="/dashboard">
            <ListingTabs listingData={{
              ...this.state.userLendingListings,
              userBorrowing: this.state.userBorrowing
            }}
              borrowNo={this.state.userBorrowing.length}
              lendNo={this.state.userLendingListings.loan.length}
              listingNo={this.state.userLendingListings.available.length} />
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
          <Route path="/dashboard/listing/:id" component={EditSingleListingPage} />
          {/* <EditSingleListingPage />
          </Route> */}

        </Switch>

      </div>
    )
  }
}
