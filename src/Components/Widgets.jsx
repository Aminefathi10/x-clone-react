import React from 'react'
import "./Widgets.css"
import Trend from './Trend'

function Widgets() {
  return (
    <div className='Widgets'>
      <div className="serch__section">
        <i className="fa-solid fa-search"></i>
        <input type="text" placeholder='Search' />
      </div>
      <div className="trendings">
        <Trend name="Ukrain" location="USA" number="540k" />
        <Trend name="topG" location="morocco" number="20k" />
        <Trend name="trump" location="USA" number="350k" />
        <Trend name="election" location="morocco" number="5k" />
        <Trend name="judaism" location="morocco" number="10k" />
        <Trend name="tate" location="morocco" number={20} />
        <Trend name="fathi" location="morocco" number={20} />
        <Trend name="war" location="morocco" number={20} />
        <Trend name="amine" location="morocco" number={20} />
      </div>
      <div className="Suggestions">
        
      </div>
    </div>
  )
}

export default Widgets
