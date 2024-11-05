
import "./Login.css"

function Ligin({ signUpForm, loading }) {
    function handleInputlabel(e) {
       if (e.target.value !== "") {
        e.target.previousSibling.classList.add("labelStyle");
       } else {
        e.target.previousSibling.classList.remove("labelStyle");
       }
       
    }
    function showHidePassword(e) {
       if (e.target.classList.contains("fa-eye-slash")) {
        e.target.classList.remove("fa-eye-slash");
        e.target.classList.add("fa-eye");
        e.target.parentElement.previousSibling.setAttribute("type", "text");
       } else {
        e.target.classList.remove("fa-eye");
        e.target.classList.add("fa-eye-slash");
        e.target.parentElement.previousSibling.setAttribute("type", "password");
       }
    }
  return (
      <form className="loginForm" onSubmit={e => signUpForm(e)} >
        <i className="fa-brands fa-x-twitter"></i>
        <div className="input__cont">
            <h1 className="label">full name</h1>
            <input onChange={e => handleInputlabel(e)} name='fullName' type="text" />
        </div>
        <div className="input__cont">
            <h1 className="label">Photo URL(optional)</h1>
            <input onChange={e => handleInputlabel(e)} name='photURL' type="text" />
        </div>
        <div className="input__cont">
            <h1 className="label">email</h1>
            <input onChange={e => handleInputlabel(e)} name='email' type="email" />
        </div>
        <div className="input__cont">
            <h1 className="label">password</h1>
            <input onChange={e => handleInputlabel(e)} name='password' type="password" />
            <button onClick={e => showHidePassword(e)} type="button" className="show__hide"><i className="fa-regular fa-eye-slash"></i></button>
        </div>
        
        <button disabled={loading} className="submit__button">{
            !loading ? 'Sign up' : 'Loading...'
        }</button>
      </form>
  )
}

export default Ligin
