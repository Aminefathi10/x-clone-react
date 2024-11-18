
import { useRef, useState } from 'react';
import "./Login.css"
import XIcon from '@mui/icons-material/X';

export default function Login({ signUpForm, loading }) {

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
    
  return (
    <div className="authInterface">
        <XIcon className="icon" />
        
        <form className="loginForm" onSubmit={e => signUpForm(e, signUp)} >
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