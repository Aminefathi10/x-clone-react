import style from './profile.module.css'
import { useParams } from "react-router";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useEffect, useState } from 'react';
import { onSnapshot, query, where, orderBy, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import Post from './Post';

export default function Profile() {

    const { user_id } = useParams();
    const [ posts, setPosts ] = useState([]);
    const [ userData ,setUserdata ] = useState({})
    const collRef = collection(db, 'Posts');
    const { uid, likedPosts } = useSelector(state => state.user.user);


    const q = query(collRef, where('uid', '==', user_id), orderBy('postedAt', 'desc'));
    useEffect(() => {
        onSnapshot(q, function(snap) {
         const docsArr = [];
             snap.docs.forEach(doc => {
               docsArr.push({...doc.data(), id: doc.id})
             })
           setPosts(docsArr)
         });

         getDoc(doc(db, 'users', user_id)).then(doc => {
            setUserdata(doc.data());
         }).catch(err => {
            if(err){

            }
         })
         document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
             
       }, []);

    function deletePost (id) {
    const docRef = doc(collRef, id)
    deleteDoc(docRef)
    }

  return (
    <div className="Feed">
      <div className={style.profile_pics}>
        <div className={style.image_container}>
          <img src={userData.photoURL ? userData.photoURL : '/avatar'} alt="" />
        </div>
      </div>
      <div className={style.user_data}>
            <button style={{position: 'absolute', top: 10, right: 10, padding: '10px 25px', background: 'white', color: 'black', fontWeight: 700, borderRadius: 9999}}>Follow</button>
            <h1 className={style.name}>{userData.name}</h1>
            <h2 className={style.username}>{userData.username}</h2>
            <p className={style.bio}></p>
            <h2 className={style.joining_date}><CalendarMonthRoundedIcon />joined Nov 2024</h2>
        </div>
        <div className={style.follows}>
            <h1><span>{userData.followers?.length}</span> followers</h1>
            <h1><span>{userData.followings?.length}</span> followings</h1>
        </div>
        <div className={style.top_bar}>
            <nav>
                <h1>Posts</h1>
            </nav>
        </div>
        <div className="posts">
          { posts.map(post => <Post post={post} deletePost={deletePost} key={post.id}  likedPosts={likedPosts} currentUser={uid} />)  }
        </div>
    </div>
  )
}
