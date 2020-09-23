import React, { Component } from 'react'

import ListingTabs from '../../Components/ListingTabs'
import ListingDetailPage from '../../Pages/ListingDetailPage';
import EditSingleListingPage from '../../Pages/EditSingleListingPage';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

export default class DashboardPage extends Component {

  constructor(props) {
    super(props);

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
    this.fetchUserBorrowesListing()
    this.fetchUserPostedListing()
    this.fetchUserLendingListing()
  }

  fetchUserPostedListing = async () => {
    const url = `/api/listings/user/${this.state.userId}`;

    try {
      let res = await fetch(url)
      let userListings = await res.json()
  
      this.setState((prevState) => ({
        userLendingLists: prevState.userLendingListings.available = userListings
      }))
    } catch (err) {
      console.log(err);
    }
  }

  fetchUserBorrowesListing = async () => {
    const url = `/api/listings/user/${this.state.userId}/borrowed`;
    try {
      let res = await fetch(url)
      let borrowedListings = await res.json()
  
      this.setState((prevState) => ({
        userBorrowing: prevState.userBorrowing = borrowedListings
      }))
    } catch (err) {
      console.log(err);
    }
  }

  fetchUserLendingListing = async () => {
    const url = `/api/listings/user/${this.state.userId}/loan`;
    try {
      let res = await fetch(url)
      let loanListings = await res.json()
  
      this.setState((prevState) => ({
        userLendingLists: prevState.userLendingListings.loan = loanListings
      }))
    } catch (err) {
      console.log(err);
    }
  }

  addNewListingToState= (obj) => {
    console.log(obj, 'newData');
    this.setState(prevState=>({
      userLendingListings: [...prevState.userLendingListings.available, obj]
    }))
  }

  render() {
    return (
      <div>
        
        <Switch>
          <ProtectedRoute exact path="/dashboard">
    
            <h1>Welcome back {this.props.user}</h1>


            <ListingTabs 
              user={this.props.user}
              userId={this.state.userId}
              updateParentState={this.addNewListingToState}
              borrowing={this.state.userBorrowing}
              borrowNo={this.state.userBorrowing.length}
              listingNo={this.state.userLendingListings.available.length}
              lendNo={this.state.userLendingListings.loan.length} 
            />
          </ProtectedRoute>




          {/* available */}
          <Route path="/dashboard/available">
            <ListingDetailPage allListings={this.state.userLendingListings.available}
              nextpage={"loan"}
              edit={true} />
          </Route>
          
          
          
          
          {/* On loan */}
          <Route path="/dashboard/loan">
            <ListingDetailPage allListings={this.state.userLendingListings.loan}
              nextpage={"available"}
              edit={true} />
          </Route>
          
          
          
          
          <Route path="/dashboard/listing/:id" component={EditSingleListingPage} />

        </Switch>

      </div>
    )
  }
}
 