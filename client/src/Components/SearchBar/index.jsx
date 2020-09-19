import React from 'react'
import './index.css'
import { Form } from 'react-bootstrap'

export default function SearchBar(props) {
  let { scope } = props
  return (
    <div className={`search ${scope}`} style={{ display: "flex", justifyContent: "center" }}>
      <Form.Control onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        value={props.value}
        placeholder="Keyword search" />
      <p>maybe add filters here</p>
    </div>
  )
}

