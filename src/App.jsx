import './App.css';
import { useState } from 'react';
import Login from "./Components/Login.jsx"
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "./firebase.js";
import { useDispatch } from 'react-redux';
import { getUser } from './features/user/userSlice.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const linkRegEx = /https:\/\/[^\s/]+\/[^\s]*/


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  let loading = false;
  const dispatch = useDispatch();



  async function signUp(e, s) {

    e.preventDefault();
    loading = true;
    if(e.target.photoURL.value !== "" && !linkRegEx.test(e.target.photoURL.value)){
      alert('Enter a valid photo URL');
    }
    
      if(s){
             createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
            .then((creds) => {
              updateProfile(creds.user, {
                displayName: e.target.fullName.value,
                photoURL: e.target.photoURL.value
              }).then(() => {
                auth.currentUser.reload().then(() => {
                  dispatch(getUser({
                    uid: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                    username: '@' + auth.currentUser.email.slice(0, auth.currentUser.email.indexOf('@')),
                    likedPosts: [],
                    reposts: [],
                  }));

                  setDoc(doc(db, 'users', auth.currentUser.uid), {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                    username: '@' + auth.currentUser.email.slice(0, auth.currentUser.email.indexOf('@')),
                    likedPosts: [],
                    reposts: [],
                    followers: [],
                    followings: []
                  });
                });
              }).catch((error) => { 
                console.log(error);
              });
            });
            
          } else {
            signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value);
          }
    loading = false;
    
  }


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
       })
    
        setAuthenticated(true);
      
      }
      
    } else {
      setAuthenticated(false)
    }
  });
  
  function signout () {
    signOut(auth).then(res => {
      setAuthenticated(false);
    })
  }
  return (
    <div className="App">
       {!authenticated ? <Login signUpForm={signUp} loading={loading} /> :
        <> 
          <Sidebar signout={signout} />
          <Feed />
          <Widgets/>
     </>
       }
    </div>
  );
}

export default App;
