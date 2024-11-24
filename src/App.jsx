import './App.css';
import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from "./firebase.js";
import { useDispatch } from 'react-redux';
import { getUser } from './features/user/userSlice.js';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';



function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const Route = useNavigate();


  onAuthStateChanged(auth, async user => {
  
    if (user) {
      if(user.displayName){
       await getDoc(doc(db, 'users', user.uid)).then(doc => {
        dispatch(getUser({
            uid: user.uid,
            ...doc.data()
          }));
       }).catch(err => {
        console.log(err)
       });
    setAuthenticated(true);
      }
    }
  });
  
  function signout () {
    if(auth.currentUser){
      signOut(auth).then(res => {
      setAuthenticated(false);
      alert('You are signed out');
      dispatch(getUser({
        uid: null,
        likedPosts: [],
        reposts: [],
        name: null,
        username: null,
        photoURL: null,
      }));
    })
    } else {
      Route('/signup')
    }
    
  }
  return (
    <div className="App">
          <Sidebar authenticated={authenticated} signout={signout} />
          <Feed />
          <Widgets/>
    </div>
  );
}

export default App;
