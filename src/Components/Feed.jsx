import "./Feed.css";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';


function Feed() {
  const collRef = collection(db, "Posts");
  const q = query(collRef, orderBy("postedAt", "desc"));

  const {uid, likedPosts, name, username, photoURL} = useSelector(state => state.user.user);


  const [ posts, setPosts ] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collRef, {
      uid: uid,
      name: name,
      username: username,
      photoURL: photoURL,
      description: e.target.post_input.value,
      postImg: null,
      likes: 0,
      comments: 0,
      postedAt: serverTimestamp()
    }).then(() => {
      console.log('post added')
    }).catch(error => {
      console.log("error adding the post", error)
    });
    e.target.reset();
  };

useEffect(() => {
 onSnapshot(q, function(snap) {
  const docsArr = [];
      snap.docs.forEach(doc => {
        docsArr.push({...doc.data(), id: doc.id})
      })
    setPosts(docsArr)
  }) 
      
}, [])


  function deletePost (id) {
    const docRef = doc(collRef, id)
    deleteDoc(docRef)
  }
  

  const parentRefs = useRef([]);
  function handleFeed(clickedIndex){
    
    parentRefs.current.forEach((ref, index) => {
      console.log('functinon called')
      if (ref) {
        const child = ref.querySelector('h1');
        if (index === clickedIndex) {
          child.classList.add('foryou__folowing');
        } else {
          child.classList.remove('foryou__folowing');
        }
      }
    });

  }
  return (
    <div className='Feed'>
      <div className="Header">
        <div className='head' ref={el => (parentRefs.current[0] = el)} onClick={() => handleFeed(0)}><h1 className="foryou__folowing">For you</h1></div>
        <div className='head' ref={el => (parentRefs.current[1] = el)} onClick={() => handleFeed(1)}><h1>Following</h1></div>
      </div>
      <form className="CreatePost" onSubmit={e => handleSubmit(e)}>
        <div className="top__post">
          {/* <i className="fa-solid fa-user"></i> */}
          <img src={photoURL ? photoURL : '/avatar.png'} className="userAvatar" alt='a' /> 
          <input autocomplete="off" name="post_input" type="text" placeholder="What's up?!" required />
        </div>

        
        <div className="bottom__post">
          <div className="createOptions">
            <label form="imageIn">
              <span><ImageRoundedIcon /></span>
              <input style={{display: 'none'}} type="file" name="image" id="imageIn" />
            </label>
            <span><PollRoundedIcon /></span>
            <span><EmojiEmotionsRoundedIcon /></span>
            <span><CalendarMonthRoundedIcon /></span>
          </div>
          <button>Post</button>
        </div>
      </form>
      <div className="posts">
      { posts.map(post => <Post post={post} deletePost={deletePost} key={post.id}  likedPosts={likedPosts} currentUser={uid} />)  }
      </div>
    </div>
  )
}

export default Feed
