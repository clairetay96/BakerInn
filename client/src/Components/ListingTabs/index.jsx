import React, { useState } from 'react'
import './index.css'

import { Tab, Tabs, Button, Modal, CardDeck } from "react-bootstrap";
import ListingDetail from '../ListingDetail';
import { Link } from 'react-router-dom';

import AddListingPage from "../../Pages/AddListingPage";


export default function ListingTabs(props) {
  let { available = null } = props.listingData

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Tabs defaultActiveKey="listing-status" transition={false} id="noanim-tab-listing" className="listing-tabs">
      <Tab eventKey="listing-status" title="Listing Status">
        Links to user borrowing from other users and user lending to other users
            <div className="listing-selection-box">
          <div className="listing-selection">
            <h3>Lending</h3>
            <p >
              <Link to="/dashboard/lending">
                x items
                  </Link>
            </p>
          </div>
          <div className="listing-selection">
            <h3>Borrowing</h3>
            <p >
              <Link to="/dashboard/borrowing">
                x items
                  </Link>
            </p>
          </div>
        </div>
      </Tab>
      <Tab eventKey="user-listing" title="My Available Listing">
        <div style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", marginTop: "35px" }}>
          <div>
            <p>Total listing: xxx</p>
          </div>
          <div>
            <Button variant="primary" onClick={handleShow}>Add New Listing</Button>
            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title >Add Listing</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddListingPage />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <CardDeck className="container" style={{ display: "flex", justifyContent: "start" }}>
          <ListingDetail allListings={available}
            edit={true} />
        </CardDeck>
      </Tab>
    </Tabs>
  )
}
