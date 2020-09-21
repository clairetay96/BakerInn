import React from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './index.css'

export default function CarouselCard({item}) {
  const style = {
    container: {
      height: "calc(100% - 0.7em * 2)",
      width: "calc(100% - 0.7em * 2)",
      margin: "0.7em",
      backgroundColor: "mediumslateblue",
      boxShadow: "0.3em 0.3em 1em rgba(0,0,0,0.3)",
      borderRadius: 15,
    },
    pop: {
      height: "max-content",
      borderRadius: "15px 15px 0 0",
      backgroundColor: 'white',
    }
  }
  let history = useHistory()

  const beamMeUp = () => {
    const path = `/homepage/listing/${item._id}`
    history.push(path)
  }

  return (
   
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Title as="h3">{item.category}</Popover.Title>
            <Popover.Content>
              Description: {item.description}
            </Popover.Content>
          </Popover>
        }
      >
        <div onClick={beamMeUp}className="carousel-item-thing" 
          style={style.container}>
            <div style={style.pop}>{item.item}</div>
        </div>
      </OverlayTrigger>
  )
}
