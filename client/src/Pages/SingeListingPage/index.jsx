import React, { Component } from 'react'
import './index.css'

import { Button } from 'react-bootstrap'

export default class SingleListingPage extends Component {
  render() {

    // layout the page
    // get dynamic data for single page
    return (
      <div className="container singleListing" >
        <div className="col">
          <div className="itemImage">
            <img className="image" src="https://storage.googleapis.com/eezee-product-images/redman-sporting-non-stick-baking-pan-zlum_600.jpg" alt="" style={{ width: "350px", borderRadius: "10px" }} />
          </div>
        </div>

        <div className="col">
          <div className="row userInfo">
            <div >
              <img src="https://apprecs.org/gp/images/app-icons/300/41/com.mybox.tothetop.jpg" style={{ width: "100px", height: "100px" }} />
            </div>
            <div className="text-left col user">
              <h4>Ali</h4>
              <p>Item location: North</p>
            </div>
          </div>
          <div className="text-left itemInfo">
            <h3>Baking Pan</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit cum esse rerum recusandae debitis voluptatum, sunt illo optio soluta commodi ipsa incidunt veniam ipsum dignissimos temporibus? Earum deserunt sit ducimus!</p>
            <Button >Chat</Button>
          </div>
        </div>
      </div>
    )
  }
}
