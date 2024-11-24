
import { useRef, useState } from 'react';
import "./Login.css";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase.js";
import { useDispatch } from 'react-redux';
import { getUser } from '../features/user/userSlice.js';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import XIcon from '@mui/icons-material/X';

const linkRegEx = /https:\/\/[^\s/]+\/[^\s]*/;

export default function Login() {

    const dispatch = useDispatch();
    const Route = useNavigate();
    const [loading, setLoading] = useState();

    const[signUp, setSignup] = useState(true);
    const inputRefs = useRef(null);
    function handleInputlabel(e) {
       if (e.target.value !== "") {
        e.target.previousSibling.classList.add("labelStyle");
       } else {
        e.target.previousSibling.classList.remove("labelStyle");
       }
       
    }
    
    
    function handleFormSwitch() {
        if(signUp) {
            inputRefs.current.classList.add('formLogIn');
            setSignup(false)
        } else {
            inputRefs.current.classList.remove('formLogIn');
            setSignup(true)
        }
    }
  
 async function signUpForm(event) {

        event.preventDefault();
        if(event.target.photoURL.value !== "" && !linkRegEx.test(event.target.photoURL.value)){
          alert('Enter a valid photo URL');
        }
        
          if(signUp){
            setLoading(p => !p)
               await  createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
                .then((creds) => {
                  updateProfile(creds.user, {
                    displayName: event.target.fullName.value,
                    photoURL: event.target.photoURL.value
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

                      Route('/')
                    });
                  }).catch((error) => { 
                    console.log(error);
                  });
                });
                setLoading(p => !p)
                
              } else {
                setLoading(p => !p)
               await signInWithEmailAndPassword(auth, event.target.email.value, event.target.password.value).then(() => {
                    Route('/');
                });
                setLoading(p => !p)
              }
        
      }
    
  return (
    <div className="authInterface">
        <XIcon className="icon" />
        
        <form className="loginForm" onSubmit={signUpForm} >
            <div ref={inputRefs}>
                <div className="input__cont">
                    <h1 className="label">full name</h1>
                    <input required={signUp} autoComplete='off' onChange={e => handleInputlabel(e)} name='fullName' type="text" />
                </div>
                <div className="input__cont">
                    <h1 className="label">Photo URL(optional)</h1>
                    <input autocomplete="off" onChange={e => handleInputlabel(e)} name='photoURL' type="text" />
                </div>
            </div>
            
            <div className="input__cont">
                <h1 className="label">email</h1>
                <input required autocomplete="off" onChange={e => handleInputlabel(e)} name='email' type="email" />
            </div>
            <div className="input__cont">
                <h1 className="label">password</h1>
                <input required autocomplete="off" onChange={e => handleInputlabel(e)} name='password' type="password" />
            </div>
            
            <div className="btns">
                <button type='submit' disabled={loading} className="submit__button">{loading ? 'Loading...' : signUp ? 'Sign Up' : 'Sign In'}</button>

                <p>{signUp ? 'Already a member? ' : 'New? '}<button type='button' onClick={handleFormSwitch}>{signUp ? 'Sign in' : 'Sign up'}</button></p>
            </div> 
        </form>
        
    </div>
      
  )
}