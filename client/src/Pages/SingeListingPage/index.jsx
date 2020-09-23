import React, { Component } from 'react'
import './index.css'

import { Breadcrumb, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

class SingleListingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      loading: true
    }
  }

  componentDidMount() {
    // get the id for creating new chat
    const listing_id = this.props.match.params.id
    this.setState({
      listing_id: listing_id
    })
    // get the data for one listing
    // need seller data
    const url = `/api/listings/${listing_id}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          loading: false
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    // layout the page
    // get dynamic data for single page
    let [, path1, path2, path3] = this.props.history.location.pathname.split('/');

    console.log(this.state.data);

    return (
      <>
        <Breadcrumb >
          <Breadcrumb.Item as="div" href="#" >
            <Link to={`/${path1}`}>{path1}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item as="div" href="#">
            <Link to={`/${path1}/${this.state.loading ? null : this.state.data.category}`}>{this.state.loading ? null : this.state.data.category}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item as="div" active>
            {this.state.loading ? null : this.state.data.item}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="container singleListing" >
          <div className="col">
            <div className="itemImage">
              <div style={{ height: "280px", width: "280px", border: "1px solid lightgrey", margin: " 10px auto", display: "flex", justifyContent: "center", alignItems: "center" }}><p>Image Not Available</p> </div>
            </div>
          </div>

          <div className="col">
            <div className="row userInfo">
              <div >
                <img src="https://apprecs.org/gp/images/app-icons/300/41/com.mybox.tothetop.jpg" style={{ width: "100px", height: "100px" }} />
              </div>
              <div className="text-left col user">
                <h4>{this.state.loading ? null : this.state.data.owner_info.username}</h4>
                <p>Item location: {this.state.loading ? null : this.state.data.location}</p>
              </div>
            </div>
            <div className="text-left itemInfo">
              <h3>{this.state.loading ? null : this.state.data.item}</h3>
              <p>{this.state.loading ? null : this.state.data.description}</p>
              <Button disabled={this.state.loading}
                onClick={() => this.props.createChat(this.state.data)}>
                Chat
            </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(SingleListingPage);
