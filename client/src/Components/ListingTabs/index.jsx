import React from 'react'
import './index.css'

import { Tab, Tabs, Row, Col } from "react-bootstrap";
import ListingDetail from '../ListingDetail';
import { Link, Route, Switch } from 'react-router-dom';
import ListingDetailPage from '../../Pages/ListingDetailPage';
import EditSingleListingPage from '../../Pages/EditSingleListingPage';
import ProtectedRoute from '../ProtectedRoute';


export default function ListingTabs(props) {
  let { available=null, loan=null, userBorrowing=null } = props.listingData
  return (
    <Switch>
      <ProtectedRoute exact path="/dashboard">
        <Tabs defaultActiveKey="listing-status" transition={false} id="noanim-tab-listing" className="listing-tabs">
          <Tab eventKey="listing-status" title="Listing Status">
            Links to user borrowing from other users and user lending to other users
            <Row>
              <Col className="listing-selection">
                Lending
                <div>
                  <Link to="/dashboard/lending">
                    x items
                  </Link>
                </div>
              </Col>
              <Col className="listing-selection">
                Borrowing
                <div>
                  <Link to="/dashboard/borrowing">
                    x items
                  </Link>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="user-listing" title="My Available Listing">
            <div>
              <Row className="ml-2 mr-2">
                <div>
                  Total listing: xxx
                </div>
                <button>Add new listing</button>
              </Row>
              <ListingDetail allListings={available}
                           edit={true}/>
            </div>
          </Tab>
        </Tabs>
      </ProtectedRoute>
        <Route path="/dashboard/borrowing">
          <ListingDetailPage allListings={userBorrowing} 
                             nextpage={"lending"}
                             edit={false}/>
        </Route>
        <Route path="/dashboard/lending">
          <ListingDetailPage allListings={loan} 
                             nextpage={"borrowing"}
                             edit={true}/>
        </Route>    
        <Route path="/dashboard/listing/:id">
          <EditSingleListingPage />
        </Route>  
    </Switch>
  )
}
