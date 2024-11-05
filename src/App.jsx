import './App.css';
import { useState, useTransition } from 'react';
import Login from "./Components/Login.jsx"
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateCurrentUser } from 'firebase/auth';
import { auth } from "./firebase.js";
import { useDispatch } from 'react-redux';
import { getUser } from './features/user/userSlice.js';


function App() {
  const [isPending, startTransition] = useTransition();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  function signUp(e) {
    e.preventDefault();
    startTransition(async () => {
      const creds = await createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value);
      dispatch(getUser(creds))
    })
  }
  onAuthStateChanged(auth, user => {
     setUser(user.email);
    if (user) {
      setAuthenticated(true);
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
       {!authenticated ? <Login signUpForm={signUp} loading={authenticated} /> :
        <> 
          <Sidebar signout={signout} />
          <Feed userEmail={user} />
          <Widgets/>
     </>
       }
    </div>
  );
}

export default App;
