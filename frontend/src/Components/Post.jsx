import CommentIcon from '../assets/SVGs/CommentIcon';
import FavoriteBorderIcon from '../assets/SVGs/LikeIcon';
import FavoriteIcon from '../assets/SVGs/LikedIcon';
import CachedIcon from '../assets/SVGs/RepostIcon';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { db } from '../firebase';
import { updateDoc, doc, increment, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import "./post.css"
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, dislikePost, repost, rmReposts } from '../features/user/userSlice';
import { useNavigate, Link } from 'react-router';
import Comment from './addComment';
import { PostSkeleton } from '../ui/skeletons';

const arabicAl = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';



export default function Post({post : { uid, description, postImg, likes, id, name, username, photoURL, comments, postReposts }, deletePost, currentUser}){

  const dispatch = useDispatch();
  const route = useNavigate();
  const {userAvatar, reposts, likedPosts} = useSelector(state => state.user.user);
  const [isRepleying, setIsRepleying] = useState(false);
  const [isMenuDisplay, setIsmenuDisplay] = useState(false);
  const [author, setAuthor] = useState(null);

  getDoc(doc(db, 'users', uid)).then(data => {
    const user = data.data();
    setAuthor({
      name: user.name,
      username: user?.username,
      photoURL: user?.photoURL
    })
  })
    

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const [isLiked, setIsLiked] = useState(likedPosts.includes(id));
  const [isReposted, setIsReposted] = useState(reposts.includes(id));

  useEffect(() => {
    if(!currentUser){
      setIsLiked(false);
      setIsReposted(false);
    }
    
  }, [currentUser])

  function handleRepost(event){
    event.preventDefault();
    event.stopPropagation();
    if(!currentUser){
      route('/signup')
      return;
    }
    if(!reposts.includes(id)){
      updateDoc(doc(db, 'users', currentUser), {
        reposts: arrayUnion(id)
      });
      updateDoc(doc(db, 'Posts', id), {
        postReposts: increment(1)
      });
      dispatch(repost(id));
      setIsReposted(true);
    } else {
      updateDoc(doc(db, 'users', currentUser), {
        reposts: arrayRemove(id)
      });
      updateDoc(doc(db, 'Posts', id), {
        postReposts: increment(-1)
      });
      dispatch(rmReposts(id));
      setIsReposted(false);
    }
    
  }

  function handlePostLike(event){
    event.preventDefault();
    event.stopPropagation();
    if(!currentUser){
      route('/signup')
      return;
    }
    setIsLiked(true);
    if(!isLiked) {
      dispatch(likePost(id));
      updateDoc(doc(db, 'Posts', id), {
      likes: increment(1)
    });
    updateDoc(doc(db, 'users', currentUser), {
      likedPosts: arrayUnion(id)
    })
    } else {
      setIsLiked(false);
        dispatch(dislikePost(id))
        updateDoc(doc(db, 'Posts', id), {
        likes: increment(-1)
      });
      updateDoc(doc(db, 'users', currentUser), {
        likedPosts: arrayRemove(id)
      })
    }
    
  }

  function displayRepForm(event){
    event.preventDefault();
    event.stopPropagation();
    if(!currentUser){
      route('/signup')
      return;
    }
    if(!isRepleying){
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    setIsRepleying(p => !p);
  }

  useEffect(() => {
    function hideMenu(event){
      if(menuRef.current && !menuRef.current.contains(event.target) && menuBtnRef.current !== event.target){
        setIsmenuDisplay(p => !p);
      }
    }

    document.addEventListener('click', hideMenu);
    return () => {
    document.removeEventListener('click', hideMenu);
    }
  })

    return (
      <>{author ? 
          <div className='post'>
          <button ref={menuBtnRef} onClick={() => {
           setIsmenuDisplay(p => !p);
          }} className='Post__menu'><MoreHorizRoundedIcon /></button>
            {isMenuDisplay && <div className="post__options__menu" ref={menuRef}>
            {uid === currentUser ? <div onClick={() => deletePost(id)} className="delete">Delete Post</div> :
            <>
              <div className="delete">Block User</div>
              <div className="delete">Report</div>
            </>}
            </div>}
        <div className="avatar">
            <Link to={'/profile/' + uid}>
              <img className='avatar__pic' src={author?.photoURL ? author?.photoURL : '/avatar.png'} alt="" />  
            </Link>
        </div>
        <div className="post__info">
            <div className="user__info">
                <Link to={'/profile/' + uid}>
                  <h1 className="name">{author?.name}</h1>
                  <h2 className="username">{author?.username}</h2>
                </Link>
                
            </div>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to={'/post/' + id}>
            <p dir={arabicAl.includes(description[0]) ? 'rtl' : 'ltr'} className="description">{description}</p>
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
            </Link>
        </div>
      </div> : <PostSkeleton /> }
      { isRepleying && <Comment post={{name, username, photoURL, description}} user={userAvatar} hideForm={displayRepForm} id={id} uid={currentUser} /> }
    </>
    )
  }