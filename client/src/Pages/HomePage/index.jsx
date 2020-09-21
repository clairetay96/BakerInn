import React, { Component } from 'react'
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';

import Carousel from '../../Components/Carousel';
import Discovery from '../../Components/Discovery';
import IntroBanner from '../../Components/IntroBanner';
import SearchBar from '../../Components/SearchBar';
import CategoryPage from '../CategoryPage';
import SingleListingPage from '../SingeListingPage';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      lastestListing: null
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    })
  }

  handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      console.log(this.state.search);
      this.setState({
        search: '',
      })
    }
  }

  componentDidMount() {
    const url = '/api/listings'

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          lastestListing: res
        })
      })
  }

  render() {
    let { isLoggedIn } = this.props;
    return (
      <>
        {/* search all pages and listings */}
        <SearchBar scope={"homepage"}
          onChange={this.handleChange}
          onKeyUp={this.handleSearch}
          value={this.state.search} />

        <Switch style={{ paddingLeft: '0' }}>
          <Route exact path="/homepage">

            {isLoggedIn
              ? (<Discovery />)
              : (<IntroBanner />)
            }

            {/* 
              Carousel listings need to updated with proper fetches
              Suggestions carousel need to have an algorithm choosing
              the listing
            */}

            <Carousel title="Freshest offers"
              lastestListing={this.state.lastestListing} />

            <Carousel title="New ingredients"
              headerLink="/homepage/ingredient"
              lastestListing={this.state.lastestListing} />

            <Carousel title="New equipment"
              headerLink="/homepage/equipment"
              lastestListing={this.state.lastestListing} />

            <Carousel title="Suggestions"
              lastestListing={this.state.lastestListing} />
          </Route>

          <Route path="/homepage/listing/:id">
            <SingleListingPage createChat={this.props.createChat} />
          </Route>

          <Route path="/homepage/ingredient">
            <CategoryPage />
          </Route>
          <Route path="/homepage/equipment">
            <CategoryPage />
          </Route>
        </Switch>
      </>
    )
  }
}