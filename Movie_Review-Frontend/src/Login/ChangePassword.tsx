import axios from "axios";
import { useState, type FormEvent } from "react";
import { Bounce, toast } from "react-toastify";
import '../Styles/ChangePassword.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState('')
  const navigate = useNavigate();
  const location = useLocation();//can carry state information about where the user came from.
  const handlechangepassword = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
  toast.error("New password and confirm password do not match",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      });
  return;
}
    try {
    const response = await axios.post( "http://localhost:9090/changepassword",
  { oldPassword, newPassword }, // like here we sending those two strings as the object as our backend expects changepassword object
  {
    withCredentials: true,      // as we know for session based we should use those
    headers: {
      "Content-Type": "application/json",
    },
  }
);
      toast.success("Password changed successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      })
      const from = location.state?.from||"/" //location.state?.from attempts to get the previous route. If no previous route is provided, it defaults to / (home page).
      // in header while navigating to /changepassword we have supplied some state object. in that what variable used that sould be used here like "from" used in header so same should use here like location.state?.from.
      navigate(from)
    } catch (error) {
      console.log(error);

      toast.error("Password change unsuccessfull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      });
    }
  };
  return (
    <>
    <form className="change_form" onSubmit={handlechangepassword}>
      
            <h3 className="change_name">Change password</h3>
            <label className="o1">OldPassword</label>
            <input type="password" placeholder="please enter old password" name="oldPassword" onChange={(e)=>setOldPassword(e.target.value)}/><br/>
            <label className="n1">NewPassword</label>
            <input type="password" placeholder="please enter new password" name="newPassword" onChange={(e)=>setNewPassword(e.target.value)}/><br/>
            <label className="n1">ConfirmPassword</label>
            <input type="password" placeholder="please re-enter new password" name="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}/><br/>
         
            <input className="change_button" type="submit" title="Click to change password" value="ChangePassword"/>

    
    </form>
    </>
  )
}
export default ChangePassword;
