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
            {props.image && <img className='post__pic' src={props.image} alt="" />}
            <div className="post__options">
              <i className='icons comment'><CommentIcon /></i>
              <i className='icons like'><FavoriteBorderIcon /></i>
              <i className='icons retweet'><CachedIcon /></i>
            </div>
        </div>
        
      </div>
    )
  }


export default Post