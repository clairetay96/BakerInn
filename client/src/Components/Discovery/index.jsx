import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './index.css'

export default function Discovery() {
  const style = {
    hero: {
      backgroundColor: "cornflowerblue",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2em"
    },
    callToAction1 : {
      height: "50%",
      backgroundColor: "yellow",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2em"
   },
    callToAction2 : {
      height: "50%",
      backgroundColor: "green",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2em"
 }
  }

  let history = useHistory();

  const redirect = (path) => {
    history.push(path)
  }

  return (
    <Row className="discovery">
      <Col style={style.hero} xs={8}>
        Spice up your baking with the <br/>GREAT SINGAPORE SALE
      </Col>
      <Col xs={4}>
        <div onClick={()=>redirect("/homepage/ingredient")} style={style.callToAction1}>
          Check out ingredients
        </div>
        <div onClick={()=>redirect("/homepage/equipment")} style={style.callToAction2}>
          Find equipment you need
        </div>
      </Col>
    </Row>
  )
}
