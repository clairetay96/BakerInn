import React from 'react'

import { Carousel as BCarousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './index.css'

export default function Carousel(props) {
  let { title, lastestListing=null } = props;

  return (
    <div>
      <h2>{ title }</h2>
      {lastestListing
        ? ( <BCarousel className="border carousel-container"
                       pause="hover">
              {/* 
                  LINK NEEDS TO BE UPDATED TO USE ITEM unique ID 
                  The click on card needs to redone
                  Redo the carousel if time permits to show multiple cards
              */}
              {lastestListing.map((item, index) => {
                return (
                  <BCarousel.Item key={index}>
                    <Link to={`/homepage/listing/${item}`}>
                      <div>
                        Placeholder
                      <BCarousel.Caption>
                        <p>replace this listing card. Card no: {item}</p>
                      </BCarousel.Caption>
                      </div>
                    </Link>  
                  </BCarousel.Item>
                )
              })}
            </BCarousel>
          )
        : ("No items to show here")
      }
    </div>
  )
}



