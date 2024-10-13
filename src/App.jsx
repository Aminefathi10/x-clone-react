import './App.css';
import { useState } from 'react';
import "https://kit.fontawesome.com/ce91c21e99.js"
import Login from "./Components/Login.jsx"
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth,} from "./firebase.js";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  function signUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
    .then(creds => console.log(creds))
    .catch(err => console.log(err))
  }
  onAuthStateChanged(auth, user => {
     setUser(user.email)
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false)
    }
  });
  return (
    <div className="App">
       {!authenticated ? <Login signUpForm={signUp} /> :
        <> 
          <Sidebar />
          <Feed userEmail={user} />
          <Widgets/>
     </>
       }
    </div>
  );
}

export default App;
