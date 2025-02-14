
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

function UserOptions() {
  return (
    <div>
      <div id="shadow_layer" onClick={e => {e.target.nextSibling.classList.add("hide"); e.target.classList.add("hide");
        document.getElementById("root").classList.remove("truncate")}} className="shadow__layer hide" />
        <div id='userOptions' className="user__menu__options hide">
          <div className="profile">Profile</div>
          <div className="lists">Lists</div>
          <div className="settings">settings</div>
          <div onClick={() => signOut(auth)} className="sign_out">Sign out</div>
        </div>
    </div>
  )
}

export default UserOptions
