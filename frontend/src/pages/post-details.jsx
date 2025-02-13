import { useEffect, useState } from 'react';
import { AddTaskSharp, BookmarkBorder, Share } from '@mui/icons-material';
import { getDoc, doc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import style from './post.module.css';
import CommentIcon from '../assets/SVGs/CommentIcon';
import LikeIcon from '../assets/SVGs/LikeIcon';
import LikedIcon from '../assets/SVGs/LikedIcon';
import RepostIcon from '../assets/SVGs/RepostIcon';
import { useParams } from 'react-router';
import Post from '../Components/Post';
import { useSelector } from 'react-redux';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export default function PostDetails() {

    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [date, setDate] = useState(null);
    const { post_id } = useParams();
    const {likedPosts, uid} = useSelector(store => store.user.user)
    
    useEffect(() => {
      getDoc(doc(db, 'Posts', post_id)).then(data => {
        const date = new Date(data.data().postedAt.seconds * 1000);
        const hours = date.getHours();
        const mins = date.getMinutes();
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        setDate(`${hours}:${mins} ${day} ${month} ${year}`)
        setPost(data.data());

        getDocs(collection(doc(db, 'Posts', post_id), 'replies')).then(snap => {
          const docsArr = [];
          snap.docs.forEach(doc => {
            docsArr.push({...doc.data(), id: doc.id})
          })
          setReplies(docsArr)
        })
      }).catch(err => console.log((err)));
    }, [])
      
 function deletePost (id) {
    const docRef = doc(collRef, id)
    deleteDoc(docRef)
  }
  return (
    <>
    {post ? (<div className='Feed'>
      <div className={style.user_data}>
        <img width={25} src={post.photoURL ? post.photoURL : "/avatar.png"} alt="" />
        <div className={style.user_info}>
          <p className={style.name}>{post.name}</p>
          <p className={style.username}>{post.username}</p>
        </div>
        <div className={style.sub_btn}>
          <button>
            Follow
          </button>
        </div>
      </div>
      <div className={style.post_body}>
        <p className={style.des}>{post.description}</p>
        {post.postImg && <img width={300} src={post.postImg} alt="" />}
      </div>
      <div className={style.postedAt}>
        <p>{date}</p>
      </div>
      <div className={style.engagement_data}>
        <p>
          <span className={style.digits}>{post.likes}</span>
          <span className={style.label}>Likes</span>
        </p>
        <p>
          <span className={style.digits}>{post.reposts}</span>
          <span className={style.label}>Reposts</span>
        </p>
        <p>
          <span className={style.digits}>{post.comments}</span>
          <span className={style.label}>Comments</span>
        </p>
      </div>
      <div className={style.reacts}>
        <button className='Like'><CommentIcon /></button>
        <button><LikeIcon /></button>
        <button><RepostIcon /></button>
        <button><Share className={style.icon} /></button>
        <button><BookmarkBorder className={style.icon} /></button>
      </div>
      <div className='posts'>
        { replies.map(post => <Post post={post} deletePost={deletePost} key={post.id}  likedPosts={likedPosts} currentUser={uid} />)  }
      </div>
  </div>) : <div className='Feed' style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh'}}><img width={30} height={30} src="/x-loading.gif" alt="Loading...." /></div>}
  </>
  )
}