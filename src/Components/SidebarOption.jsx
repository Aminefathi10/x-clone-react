import React from 'react'
import "./SidebarOption.css"

function SidebarOption({title, styleClass, moreButton, icon}) {
  return (
    <div onClick={moreButton} className={styleClass}>
      {icon}
      {title && <h1>{title}</h1>}
    </div>
  )
}

export default SidebarOption
