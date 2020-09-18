import React from 'react'

import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ListingDetail from '../../Components/ListingDetail'

export default function ListingDetailPage(props) {
  let history = useHistory()
  let {nextpage : next, allListings, edit} = props

  const handleBack = () => {
    history.push("/dashboard")
  }

  const handleNext = () => {
    history.push(`/dashboard/${next}`)
  }

  return (
    <Row className="justify-content-around">
      <Col>
        <button onClick={handleBack}>Back</button>
      </Col>
      <Col>
        <button onClick={handleNext}>{next}</button>
      </Col>
      <Col xs={12}>
        <ListingDetail allListings={allListings}
                       edit={edit}/>
      </Col>
    </Row>
  )
}
