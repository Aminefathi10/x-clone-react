import React, { useEffect, useState } from 'react';
import "./Sidebar.css"
import SidebarOption from './SidebarOption';

function Sidebar(props) {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      window.addEventListener("resize", handleWidth);
      return () => {
      window.removeEventListener("resize", handleWidth);
      }
    }, []);
    
    const handleWidth = () => {
      setWidth(window.innerWidth);
  }

  return (
    <div className='sidebar'>
        <SidebarOption styleClass='SidebarOption' icon="fa-brands fa-x-twitter" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon="fa-solid fa-house" title="Home" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon="fa-solid fa-search" title="Search" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon="fa-solid fa-bell" title="Notifications" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon="fa-solid fa-envelope" title="Messsages" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon="fa-solid fa-users" title="Comunities" />
        <SidebarOption styleClass='SidebarOption' icon="fa-solid fa-user" title="Profile" />
        {/* moreButton={(e) => {document.getElementById("userOptions").classList.remove("hide");
        document.getElementById("shadow_layer").remove("hide");
        document.getElementById("root").classList.add("truncate")}} */}
        <SidebarOption  styleClass='SidebarOption PhoneOptions' icon="fa-solid fa-bars" title="More" />

        <button className="Post">{width <= 640 ? <i class="fa-solid fa-pen-to-square"></i> : "Post"}</button>
    </div>
  )
}

export default Sidebar
