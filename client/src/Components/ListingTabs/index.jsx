import React from 'react'
import './index.css'

import { Tab, Tabs, Row, Col } from "react-bootstrap";
import ListingDetail from '../ListingDetail';
import { Link, Route, Switch } from 'react-router-dom';
import ListingDetailPage from '../../Pages/ListingDetailPage';
import EditSingleListingPage from '../../Pages/EditSingleListingPage';


export default function ListingTabs(props) {
  let { available=null, loan=null, userBorrowing=null } = props.listingData
  return (
    <Switch>
      <Route exact path="/dashboard">
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
            <ListingDetail allListings={available}
                           edit={true}/>
          </Tab>
        </Tabs>
      </Route>
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
