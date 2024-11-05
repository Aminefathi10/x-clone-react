import React, { useEffect, useState } from 'react';
import "./Sidebar.css"
import SidebarOption from './SidebarOption';
import SearchIcon from '@mui/icons-material/Search';
import XIcon from '@mui/icons-material/X';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';


function Sidebar({signout}) {
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
        <SidebarOption styleClass='SidebarOption' icon={<XIcon />} />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon={<HomeIcon className="i" />} title="Home" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon={<SearchIcon className="i" />} title="Search" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon={<NotificationsIcon className="i" />} title="Notifications" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon={<MarkunreadIcon className="i" />} title="Messsages" />
        <SidebarOption styleClass='SidebarOption PhoneOptions' icon={<PeopleIcon className="i" />} title="Comunities" />
        <SidebarOption styleClass='SidebarOption' icon={<PersonIcon className="i" />} title="Profile" />
        {/* moreButton={(e) => {document.getElementById("userOptions").classList.remove("hide");
        document.getElementById("shadow_layer").remove("hide");
        document.getElementById("root").classList.add("truncate")}} */}
        <button onClick={signout}><SidebarOption  styleClass='SidebarOption PhoneOptions' icon={<MenuIcon className="i" />} title="More" /></button>
        <div className="main__menu">
          <button></button>
        </div>
        <button className="Post">{width <= 640 ? <PostAddIcon /> : "Post"}</button>
    </div>
  )
}

export default Sidebar
