import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CachedIcon from '@mui/icons-material/Cached';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { db } from '../firebase';
import { updateDoc, doc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import "./post.css"
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, dislikePost, repost, rmReposts } from '../features/user/userSlice';
import Comment from './addComment';


export default function Post({post : { uid, description, postImg, likes, id, name, username, photoURL, comments, postReposts }, likedPosts, deletePost, currentUser}){

  const dispatch = useDispatch();
  const {userAvatar, reposts} = useSelector(state => state.user.user);
  const [isRepleying, setIsRepleying] = useState(false);
    

  const menuRef = useRef(null);
  const [isLiked, setIsLiked] = useState(likedPosts.includes(id));
  const [isReposted, setIsReposted] = useState(reposts.includes(id));

  function handleRepost(){
    if(!reposts.includes(id)){
      updateDoc(doc(db, 'user', currentUser), {
        reposts: arrayUnion(id)
      });
      updateDoc(doc(db, 'Posts', id), {
        postReposts: increment(1)
      });
      dispatch(repost(id));
      setIsReposted(true);
    } else {
      updateDoc(doc(db, 'user', currentUser), {
        reposts: arrayRemove(id)
      });
      updateDoc(doc(db, 'Posts', id), {
        postReposts: increment(-1)
      });
      dispatch(rmReposts(id));
      setIsReposted(false);
    }
    
  }

  function handlePostLike(){
    setIsLiked(true);
    if(!isLiked) {
      dispatch(likePost(id));
      updateDoc(doc(db, 'Posts', id), {
      likes: increment(1)
    });
    updateDoc(doc(db, 'users', uid), {
      likedPosts: arrayUnion(id)
    })
    } else {
      setIsLiked(false);
        dispatch(dislikePost(id))
        updateDoc(doc(db, 'Posts', id), {
        likes: increment(-1)
      });
      updateDoc(doc(db, 'users', uid), {
        likedPosts: arrayRemove(id)
      })
    }
    
  }

  function displayRepForm(){
    if(!isRepleying){
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    setIsRepleying(p => !p);
  }

    return (
      <>
          <div className='post'>
          <button onClick={() => {
           menuRef.current.style.display = menuRef.current.style.display === "none" ? "block" : "none";
          }} className='Post__menu'><MoreHorizRoundedIcon /></button>
            <div className="post__options__menu" ref={menuRef}>
            {uid === currentUser ? <div onClick={() => deletePost(id)} className="delete">Delete Post</div> :
            <>
              <div className="delete">Block User</div>
              <div className="delete">Report</div>
            </>
            }
            </div>
        <div className="avatar">
            <img className='avatar__pic' src={photoURL ? photoURL : '/avatar.png'} alt="" />
        </div>
        <div className="post__info">
            <div className="user__info">
                <h1 className="name">{name}</h1>
                <h2 className="username">{username}</h2>
            </div>
            <p className="description">{description}</p>
            {postImg && <div className='post_pic_container'><img className='post__pic' src={postImg} alt="" /></div>}
            <div className="post__options">
              <button onClick={displayRepForm} className='react_btn comment'>
              <CommentIcon />
              <p>{comments}</p>
              </button>
              <button onClick={handlePostLike} className='react_btn like'>
              {!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon style={{color: 'red'}} />}
              <p style={{color: isLiked ? 'red' : 'inherit'}}>{likes}</p>
              </button>
              <button onClick={handleRepost} className='react_btn retweet'>
              <CachedIcon style={{color: isReposted ? '#00990d' : 'inherit'}} />
              <p style={{color: isReposted ? '#00990d' : 'inherit'}}>{postReposts}</p>
              </button>
            </div>
        </div>
      </div>
      { isRepleying && <Comment post={{name, username, photoURL, description}} user={userAvatar} hideForm={displayRepForm} id={id} uid={currentUser} /> }
    </>
    )
  }