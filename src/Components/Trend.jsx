import React from 'react'
import "./Trend.css"

function Trend({name, location, number}) {
  return (
    <div className='trend'>
      <p>Trending in {location}</p>
      <h1>{name}</h1>
      <p>{number} Posts</p>
      <i className="fa-solid fa-ellipsis"></i>
    </div>
  )
}

export default Trend
