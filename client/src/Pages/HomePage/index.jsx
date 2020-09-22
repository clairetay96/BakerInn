import React, { Component } from 'react'
import Switch from 'react-bootstrap/esm/Switch';
import { Route, withRouter } from 'react-router-dom';

import Carousel from '../../Components/Carousel';
import CarouselV2 from '../../Components/Carousel/test';
import Discovery from '../../Components/Discovery';
import IntroBanner from '../../Components/IntroBanner';
import SearchBar from '../../Components/SearchBar';
import CategoryPage from '../CategoryPage';
import SingleListingPage from '../SingeListingPage';
import SearchResults from '../SearchResultsPage'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      lastestListing: null,
      ingredient: null,
      equipment: null,
      searchResults: null
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

        this.props.history.push("/search?q="+this.state.search)

      this.setState({
        search: '',
      })

    }
  }

  componentDidMount() {
    const url = '/api/listings'

    // sort by category
    // suggestion random ten

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let ingredient = null;
        let equipment = null;
        if (res) {
            ingredient = res.filter((item) => {
            return item.category === "ingredient"
          })
            equipment = res.filter((item) => {
            return item.category === "equipment"
          })
        }
        this.setState({
          lastestListing: res,
          ingredient: ingredient,
          equipment: equipment
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

            <CarouselV2 title="Freshest offers"
              lastestListing={this.state.lastestListing}/>

            <CarouselV2 title="New ingredients"
              headerLink="/homepage/ingredient"
              lastestListing={this.state.ingredient}/>

            <CarouselV2 title="New equipment"
              headerLink="/homepage/equipment"
              lastestListing={this.state.equipment} />

            <CarouselV2 title="Suggestions"
              lastestListing={this.state.lastestListing} />
          </Route>

          <Route path="/homepage/listing/:id">
            <SingleListingPage createChat={this.props.createChat} />
          </Route>

          <Route path="/homepage/ingredient">
            <CategoryPage listings={this.state.ingredient}/>
          </Route>
          <Route path="/homepage/equipment">
            <CategoryPage listings={this.state.equipment}/>
          </Route>
        </Switch>
      </>
    )
  }
}

export default withRouter(HomePage)