import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Bounce, toast } from "react-toastify";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
type LoginForm = {
  userName: string;
  password: string;
};
function Login() {
  const [logindata, setLoginData] = useState<LoginForm>({
    userName: "",
    password: "",
  });
const [loading, setLoading] = useState(false);
const [messageIndex, setMessageIndex] = useState(0);

const loadingMessages = [
  "🔐 Authenticating...",
  "🚀 Logging you in...",
  "🔄 Connecting to your account...",
];

  const navigate = useNavigate();
  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logindata.userName.trim()) {
      toast.error("Please enter valid Username", {
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
     if (/^\d+$/.test(logindata.userName)) {
    toast.error("Username cannot be only numbers", {
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
    if (!logindata.password.trim() || logindata.password.length < 4) {
      toast.error("Please enter 4 digit password", {
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
     setLoading(true);
    try {
      const reponse = await axios.post(
        "http://localhost:9090/logined",
        logindata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
  setTimeout(() => {
      navigate("/movies");
       toast.success("Your login was successfull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
      });
      setLoading(false)
    }, 2500);
     
    } catch (error) {
      setLoading(false)
      console.error("Registration failed:", error);
      toast.error("Invalid Credentails", {
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
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) );
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
    {loading && (
        <div className="loading-container ">
          <div className="spinner" />
          <span className="loading-text">{loadingMessages[messageIndex]}</span>
        </div>
      )}
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h3 className="title">Login Form</h3>
          <label className="loginForm-label">UserName</label>
          <input
          className="loginform_input"
            type="text"
            placeholder="enter username"
            name="userName"
            value={logindata.userName}
            onChange={handleData}
          />
          <br />
          <label className="loginForm-label">password</label>
          <input
           className ="loginform_input"
            type="password"
            placeholder="enter password"
            name="password"
            value={logindata.password}
            onChange={handleData}
          />
          <br />
             <Link to= "/Forgotpassword" >ForgotPassword?</Link>
          <input className="login_submit" type="submit" title={loading ? "Signing in..." : "Click to Login"} value={loading ? "Signing in..." : "Click to Login"}
  disabled={loading} />
        </form>
      </div>
    </>
  );
}
export default Login;
