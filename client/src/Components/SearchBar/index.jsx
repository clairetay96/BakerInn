import React from 'react'
import './index.css'

export default function SearchBar(props) {
  return (
    <div className="search">
      <input onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              value={props.value}/>
    </div>
  )
}

