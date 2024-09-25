import React from 'react'
import "./SidebarOption.css"

function SidebarOption(props) {
  return (
    <div onClick={props.moreButton} className={props.styleClass}>
      <i class={props.icon}></i>
      {props.title && <h1>{props.title}</h1>}
    </div>
  )
}

export default SidebarOption
