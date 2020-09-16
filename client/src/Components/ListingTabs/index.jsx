import React from 'react'
import './index.css'

import { Tab, Tabs } from "react-bootstrap";

export default function ListingTabs() {
  return (
    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="listing-tabs">
      <Tab eventKey="home" title="Listing Status">
        Links to user borrowing from other users and user lending to other users
      </Tab>
      <Tab eventKey="profile" title="My Listing">
        User posted listing that is available
      </Tab>
    </Tabs>
  )
}
