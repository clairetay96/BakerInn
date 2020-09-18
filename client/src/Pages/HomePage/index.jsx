import React, { Component } from 'react'
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';

import Carousel from '../../Components/Carousel';
import IntroBanner from '../../Components/IntroBanner';
import SearchBar from '../../Components/SearchBar';
import SingleListingPage from '../SingeListingPage';

export default class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      search: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    })  
  }

  handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value !== ''){
      console.log(this.state.search);
      this.setState({
        search: '',
      })
    }
  }

  render() {
    let { isLoggedIn } = this.props;
    return (
      <div>
        {/* search all pages and listings */}
        <SearchBar scope={"homepage"}
                   onChange={this.handleChange}
                   onKeyUp={this.handleSearch}
                   value={this.state.search}/>

        <Switch>
          <Route exact path="/homepage">
          {isLoggedIn 
            ? null
            : (<IntroBanner />)
          }
          <Carousel title={"New listing for ingredients and equipment"}
                    lastestListing={[1,2,3,4,5]}/>
          </Route>
          <Route path="/homepage/listing/:id">
            <SingleListingPage/>
          </Route>
        </Switch>
      </div>


    )
  }
}
