import React from 'react'

import { Row } from 'react-bootstrap'
import ListingDetail from '../../Components/ListingDetail'

export default function ListingDetailPage() {
  return (
    <div>
      <Row>
        <button>Back</button>
        <button>Next page</button>
      </Row>
      <Row>
        <ListingDetail />
      </Row>
    </div>
  )
}
