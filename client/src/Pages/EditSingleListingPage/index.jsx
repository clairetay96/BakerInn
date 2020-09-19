import React, { Component } from 'react'
import './index.css'

import { Button } from 'react-bootstrap'

export default class EditSingleListingPage extends Component {
  render() {

    return (
      <div className="container singleListing" >
        <div className="col">
          <div className="itemImage">
            <img className="image" src="https://cf.shopee.sg/file/2903e156f06c8e301d692e3da8d1ced6" alt="" style={{ width: "350px", borderRadius: "10px" }} />
          </div>
        </div>

        <div className="col">
          <div className="row userInfo">
            <div >
              <img src="https://apprecs.org/gp/images/app-icons/300/41/com.mybox.tothetop.jpg" style={{ width: "100px", height: "100px" }} />
            </div>
            <div className="text-left col user">
              <h4>Mary</h4>
              <p>Item location: East</p>
            </div>
          </div>
          <div className="text-left itemInfo">
            <h3>item name</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit cum esse rerum recusandae debitis voluptatum, sunt illo optio soluta commodi ipsa incidunt veniam ipsum dignissimos temporibus? Earum deserunt sit ducimus!</p>

            <div className="buttons">
              <Button >Confirm</Button>
              <Button >Edit</Button>
              <Button >Delete</Button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
