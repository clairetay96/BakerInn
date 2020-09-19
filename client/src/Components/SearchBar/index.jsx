import React from 'react'
import './index.css'

export default function SearchBar(props) {
  let { scope } = props
  return (
      <div className={`search ${scope}`}>
      <input onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              value={props.value}
              placeholder="Keyword search"/>
      <p>maybe add filters here</p>
      </div>
  )
}

