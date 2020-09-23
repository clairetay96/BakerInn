import React, { Component } from 'react'
import Switch from 'react-bootstrap/esm/Switch';
import { Route, withRouter } from 'react-router-dom';

import CarouselV2 from '../../Components/Carousel/test';
import Discovery from '../../Components/Discovery';
import IntroBanner from '../../Components/IntroBanner';
import CategoryPage from '../CategoryPage';
import SingleListingPage from '../SingeListingPage';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastestListing: null,
      ingredient: null,
      equipment: null
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



        <Switch style={{ paddingLeft: '0' }}>
          <Route exact path="/homepage">

            {isLoggedIn
              ? (<Discovery />)
              : (<IntroBanner />)
            }

            <CarouselV2 title="Freshest offers"
              lastestListing={this.state.lastestListing} />

            <CarouselV2 title="New ingredients"
              headerLink="/homepage/ingredient"
              lastestListing={this.state.ingredient} />

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
            <CategoryPage listings={this.state.ingredient} category="ingredient" />
          </Route>
          <Route path="/homepage/equipment">
            <CategoryPage listings={this.state.equipment} category="equipment" />
          </Route>
        </Switch>
      </>
    )
  }
}

export default withRouter(HomePage)