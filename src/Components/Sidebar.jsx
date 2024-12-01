import { useEffect, useRef, useState } from 'react';
import "./Sidebar.css";
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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '../assets/SVGs/LoginIcon';
import { NavLink } from 'react-router';


function Sidebar({signout, authenticated}) {
  const menuRef = useRef(null);
  const secondRef = useRef(null);
  const shadowRef = useRef(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      window.addEventListener("resize", handleWidth);
      return () => {
      window.removeEventListener("resize", handleWidth);
      }
    }, []);
    
    const handleWidth = () => {
      setWidth(window.innerWidth);
      if (menuRef.current.style.transform === 'translateX(-50%)') {
        menuRef.current.style.transform = 'translateX(0)';
      }
  }

 async function handleMenu(c){
    if(width > 460){
      if(c === 'more'){
      menuRef.current.style.transform = 'translateX(-50%)';
    } else {
      menuRef.current.style.transform = 'translateX(0)'
    }
    } else {
      if(c === 'more'){
        secondRef.current.classList.remove('display-none');
        await new Promise(res => setTimeout(res, 10));
        containerRef.current.classList.add('overflow-visible');
        secondRef.current.classList.add('show-more');
        shadowRef.current.style.display = 'block';
        document.body.style.transform = 'scale(0.98)';
    } else {
        secondRef.current.classList.remove('show-more');
        shadowRef.current.style.display = 'none';
        document.body.style.transform = 'scale(1)';
        await new Promise(res => setTimeout(res, 200));
        containerRef.current.classList.remove('overflow-visible');
        secondRef.current.classList.add('display-none');
    }
    }
    
    
  }

  return (
    <>
    <div ref={containerRef} className='sidebareContainer'>
          <span className='logo' ><SidebarOption icon={<XIcon />} /></span>
       <div ref={menuRef} className='optionsWrapper'>
        <div className='sidebar'>
            <NavLink to='/'><SidebarOption styleClass='SidebarOption' icon={<HomeIcon className="i" />} title="Home" /></NavLink>
            <NavLink to='/search'><SidebarOption styleClass='SidebarOption' icon={<SearchIcon className="i" />} title="Search" /></NavLink>
            <button><SidebarOption styleClass='SidebarOption' icon={<NotificationsIcon className="i" />} title="Notifications" /></button>
            <button><SidebarOption styleClass='SidebarOption' icon={<MarkunreadIcon className="i" />} title="Messages" /></button>
            <button className='display-none'><SidebarOption styleClass='SidebarOption' icon={<PeopleIcon className="i" />} title="Comunities" /></button>
            <button><SidebarOption styleClass='SidebarOption' icon={<PersonIcon className="i" />} title="Profile" /></button>
            {/* moreButton={(e) => {document.getElementById("userOptions").classList.remove("hide");
            document.getElementById("shadow_layer").remove("hide");
            document.getElementById("root").classList.add("truncate")}} */}
            <button onClick={() => handleMenu('more')} className='moreBtn'>
              <SidebarOption  styleClass='SidebarOption PhoneOptions' icon={<MenuIcon className="i" />} title="More" />
            </button>
            {/* <MoreMenu /> */}
          </div>
          <div ref={secondRef} className='sidebar secondary'>
            <button><SidebarOption styleClass='SidebarOption' icon={<BookmarkBorderIcon className="i" />} title="Bookmarks" /></button>
            <button><SidebarOption styleClass='SidebarOption' icon={<XIcon className="i" />} title="Premium" /></button>
            <button><SidebarOption styleClass='SidebarOption' icon={<AttachMoneyIcon className="i" />} title="Monitization" /></button>
            <button onClick={signout}><SidebarOption styleClass='SidebarOption' icon={authenticated ? <LogoutIcon className="i" /> : <LoginIcon className='loginIcon' />} title={authenticated ? "Sign Out" : "Sign Up"} /></button>
            <button className='display-none' onClick={() => handleMenu('')}><SidebarOption styleClass='SidebarOption' icon={<ArrowBackIcon className="i" />} title="Main" /></button>
          </div>
      </div>
      <button onClick={() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.getElementById('post_input').focus();
      }} className="Post">{width <= 640 ? <PostAddIcon /> : "Post"}</button>
    </div>
    <div onClick={handleMenu} ref={shadowRef} className='shadow' />
  </>
  )
}

export default Sidebar
