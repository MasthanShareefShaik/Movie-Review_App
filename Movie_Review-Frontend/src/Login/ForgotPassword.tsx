import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../Styles/ForgotPassword.css";
function ForgotPassword() {
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [code,setCode] = useState("");
  const [iscodepresent, setIsCodePresent] = useState(false);
  const [generatedcode, setGeneratedCode] = useState<number | null>(null);
  const [username,setUserName] = useState('')
  const navigate = useNavigate();

  const handlecode = async() => {
    const generatedCode = Math.floor(1000 + Math.random() * 9000);
    setGeneratedCode(generatedCode);
    toast.info(`Your 4 Digit code is generated :-  ${generatedCode}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      progress: undefined,
    });
    setIsCodePresent(true);
  };

  const handleSubmition = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    if (parseInt(code) !== generatedcode) {
      toast.error("Entered code is not valid", {
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
    if(!newpassword.trim()||!confirmpassword.trim()){
          toast.error("Please fill the fields", {
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
    if (newpassword !== confirmpassword) {
      toast.error("Passwords do not match", {
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
      const response = await axios.post(
        `http://localhost:9090/forgotpassword/${username}`,
        { newpassword },
        {
          withCredentials: true, // as we know for session based we should use those
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status===400){
         toast.error("Given user is not present in database", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      });
      return
      }
       toast.success("password updation is successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      });
      setIsCodePresent(false);
      navigate("/login");
    } catch (error:any) {
            if(error.response?.status === 404){
 toast.error("Given user is not present in database", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,

        })
    }
        if(error.response?.status===409){
toast.error("New password cannot be same as old password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,

        })
        }
      toast.error("password updation is unsuccessful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      });
   
      console.log(error)
  };
  }
  return (
    <div className="forgotpassword_form">
      {iscodepresent ? (
        <form className="forgot_password" onSubmit={handleSubmition}>
          <label className="labels">Code</label>
          <input
          className="input_forgot"
            type="text"
            placeholder="enter 4digitcode"
            name="code"
            maxLength={4}
            minLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <label className="labels"> New Password</label>
          <input className="input_forgot"
            type="text"
            placeholder="Enter NewPassword"
            name="newpassword"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="labels"> Confirm Password</label>
          <input
          className="input_forgot"
            type="password"
            placeholder="Re-enter the password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        <button className="code_button" title="Update password" type="submit">Update Password</button>
          <button
            type="button" // important so it doesn't submit the form
             style={{ marginTop: 10, color: "blue", textDecoration: "underline", cursor: "pointer", background: "none", border: "none" }}
            className="regen_code_button"
            title="Click to Re-generate Code"
            onClick={handlecode}
          >
            Re-generate Code
          </button>
        </form>
      ) : (
        <>
        <label className="labels">Enter Username</label>
        <input className="input_forgot" style={{width:'100%'}} type="text" placeholder="Enter username" value={username} onChange={(e) => setUserName(e.target.value)} />
        <button className="code_button" title="Click to GenerateCode" onClick={handlecode}> Click here to Generate code</button>
                  </>
      )}
    </div>
  );
}

export default ForgotPassword;
