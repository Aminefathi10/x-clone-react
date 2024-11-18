import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CachedIcon from '@mui/icons-material/Cached';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { db } from '../firebase';
import { updateDoc, doc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import "./post.css"
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, dislikePost } from '../features/user/userSlice';


function Post(props){

  const dispatch = useDispatch();

  const menuRef = useRef(null);
  const [isLiked, setIsLiked] = useState(props.likedPosts.includes(props.id));

  function handlePostLike(){
    setIsLiked(true);
    if(!isLiked) {
      dispatch(likePost(props.id));
      updateDoc(doc(db, 'Posts', props.id), {
      likes: increment(1)
    });
    updateDoc(doc(db, 'users', props.uid), {
      likedPosts: arrayUnion(props.id)
    }).then(() => {
      alert('post liked')
    })
    } else {
      setIsLiked(false);
        dispatch(dislikePost(props.id))
        updateDoc(doc(db, 'Posts', props.id), {
        likes: increment(-1)
      });
      updateDoc(doc(db, 'users', props.uid), {
        likedPosts: arrayRemove(props.id)
      })
    }
    
  }

    return (
          <div className='post'>
          <button onClick={() => {
           menuRef.current.style.display = menuRef.current.style.display === "none" ? "block" : "none";
          }} className='Post__menu'><MoreHorizRoundedIcon /></button>
            <div className="post__options__menu" ref={menuRef}>
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
              <p>0</p>
              </button>
              <button onClick={handlePostLike} className='react_btn like'>
              {!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon style={{color: 'red'}} />}
              <p style={{color: isLiked ? 'red' : 'inherit'}}>{props.likes}</p>
              </button>
              <button className='react_btn retweet'>
              <CachedIcon />
              <p>0</p>
              </button>
            </div>
        </div>
        
      </div>
    )
  }


export default Post