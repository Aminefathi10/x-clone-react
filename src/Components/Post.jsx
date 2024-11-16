import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CachedIcon from '@mui/icons-material/Cached';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import "./post.css"

function Post(props){
    return (
          <div className='post'>
          <button onClick={() => {
           const menu = document.getElementById(props.menuOptions);
           menu.style.display = menu.style.display === "none" ? "block" : "none";
          }} className='Post__menu'><MoreHorizRoundedIcon /></button>
            <div className="post__options__menu" id={props.menuOptions}>
              <div onClick={props.deletePost} className="delete">Delete Post</div>
              <div className="delete">Block User</div>
              <div className="delete">Report</div>
            </div>
        <div className="avatar">
            <img className='avatar__pic' src={props.avatar} alt="" />
        </div>
        <div className="post__info">
            <div className="user__info">
                <h1 className="name">{props.name}</h1>
                <h2 className="username">{props.username}</h2>
            </div>
            <p className="description">{props.description}</p>
            {props.image && <div className='post_pic_container'><img className='post__pic' src={props.image} alt="" /></div>}
            <div className="post__options">
              <button className='react_btn comment'>
              <CommentIcon />
              <p>1k</p>
              </button>
              <button className='react_btn like'>
              <FavoriteBorderIcon />
              <p>1k</p>
              </button>
              <button className='react_btn retweet'>
              <CachedIcon />
              <p>1k</p>
              </button>
            </div>
        </div>
        
      </div>
    )
  }


export default Post