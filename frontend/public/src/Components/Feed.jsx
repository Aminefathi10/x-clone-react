import "./Feed.css";
import Post from "./Post";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { supabase } from "../supabase";
import { useNavigate } from "react-router";
import { PostSkeleton } from "../ui/skeletons";
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

  const arabicAl = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';

function Feed() {
  const collRef = collection(db, "Posts");
  const q = query(collRef, orderBy("postedAt", "desc"));
  const route = useNavigate();

  const {uid, likedPosts, name, username, photoURL} = useSelector(state => state.user.user);

  const [isRequired, setIsRequired] = useState(true);
  const [loading, setLoading] = useState(false)
  const [ posts, setPosts ] = useState(null);

  function handleInputChange(event){
    if(arabicAl.includes(event.target.value[0])){
      event.target.dir = 'rtl';
    } else {
      event.target.dir = 'ltr';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = e.target.image.files[0];
    let imageUrl = null;
    if(!uid){
      route('/signup')
      return;
    }
    if(image){
      setLoading(true);
      const { data, error } = await supabase.storage
        .from('posts')
        .upload(uid + image.name, image);
        imageUrl = 'https://johfsmvefdzgdnajkofj.supabase.co/storage/v1/object/public/posts/' + data?.path;
        if(error.error === 'Duplicate'){
          console.log(error);
          imageUrl = 'https://johfsmvefdzgdnajkofj.supabase.co/storage/v1/object/public/posts/' + uid + image.name;
          console.log(image.name)
        }
    }
    addDoc(collRef, {
      uid: uid,
      name: name,
      username: username,
      photoURL: photoURL,
      description: e.target.post_input.value,
      postImg: imageUrl,
      likes: 0,
      reposts: 0,
      comments: 0,
      postedAt: serverTimestamp()
    }).catch(error => {
      console.log("error adding the post", error)
    });
    setLoading(false)
    setIsRequired(true)
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
      if (ref) {
        const child = ref.querySelector('h1')
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
          <textarea onChange={handleInputChange} autocomplete="off" id="post_input" name="post_input" type="text" placeholder="What's up?!" required={isRequired} />
        </div>

        
        <div className="bottom__post">
          <div className="createOptions">
            <label form="imageIn">
              <span><ImageRoundedIcon /></span>
              <input onChange={e => setIsRequired(false)} style={{display: 'none'}} type="file" name="image" id="imageIn" />
            </label>
            <span><PollRoundedIcon /></span>
            <span><EmojiEmotionsRoundedIcon /></span>
            <span><CalendarMonthRoundedIcon /></span>
          </div>
          <button disable={loading}>
            {loading ? <img width={20} src="/loading.gif" alt="loading" /> : 'Post'}
          </button>
        </div>
      </form>
      <div className="posts">
          {posts ? posts.map(post => <Post post={post} deletePost={deletePost} key={post.id}  likedPosts={likedPosts} currentUser={uid} />)  
          : <img width={25} style={{display: 'block', margin: '10px auto'}} src="/x-loading.gif" />}
      </div>
    </div>
  )
}

export default Feed
