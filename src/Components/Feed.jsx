import "./Feed.css";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore"

function Feed(props) {
  const collRef = collection(db, "Posts");
  const q = query(collRef, orderBy("postedAt", "desc"))
  const [ posts, setPosts ] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collRef, {
      name: null,
      username: "@" + props.userEmail.slice(0, props.userEmail.indexOf("@")),
      description: e.target.post_input.value,
      avatar: null,
      postImg: null,
      postedAt: serverTimestamp()
    });
    e.target.reset();
  };

useEffect(() => {
 onSnapshot(q, function(snap) {
const docsArr = [];
      snap.docs.forEach(doc => {
        console.log(doc)
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
      <form className="CreatePost" onSubmit={handleSubmit}>
        <div className="top__post">
          {/* <i className="fa-solid fa-user"></i> */}
          <p className="userAvatar">{props.userEmail.slice(0, 1)}</p>
          <input name="post_input" type="text" placeholder="What's up?!" required />
        </div>
        
        <div className="bottom__post">
          <div className="createOptions">
            <i className="fa-solid fa-image"></i>
            <i className="fa-solid fa-square-poll-horizontal"></i>
            <i className="fa-solid fa-face-smile"></i>
            <i className="fa-solid fa-calendar"></i>
          </div>
          <button>Post</button>
        </div>
      </form>
      <div className="posts">
      { posts.map(post => <Post deletePost={() => deletePost(post.id)} key={post.id} menuOptions={post.id} avatar={post.avatar} name={post.name} username={post.username} description={post.description} image={post.postImg ? post.postImg : ""} />)  }
      </div>
    </div>
  )
}

export default Feed
