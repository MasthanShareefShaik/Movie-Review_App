import axios from "axios"
import { useState, type ChangeEvent, type FormEvent } from "react"
import '../Styles/Register.css';
import { Flip,  toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type FormData={
        name:string,
        age:number,
        password:string,
        roles:string
}
function Register(){

    const [formdata, setFormData] = useState<FormData>({
        name:'',
        age:0,
        password:'',
        roles:''
    })
    const navigate = useNavigate();
    const handlerRegister = (e: ChangeEvent<HTMLInputElement>)=>{
   const { name, value } = e.target;

  const updatedValue = name === "age" ? parseInt(value) : value;

  setFormData(prev => ({
    ...prev,
    [name]: updatedValue
  }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(!formdata.name.trim()){
     toast.error("Please enter valid name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
      });
      return
      }
      if(!formdata.password|| formdata.password.length<4){
        toast.error("Please enter valid 4 digit password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
      });
      return
      }
      if(formdata.roles===''){
toast.error("Please select role", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
      });
      return
      }
      try{
        const res = await axios.post('http://localhost:9090/register',formdata);
        console.log(res.data);
        console.log(res.status);
        
        toast.success(` "${formdata.name}" Registration Successfull`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
      } )
      navigate('/login')
        console.log("Registered:", res.data);
        setFormData({
        name: '',
        age: 0,
        password: '',
        roles: '',
      });
      }
      catch(error:any){
 if (error.response.status === 409) {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Flip,
          progress: undefined,
        });
      }
       console.error('Registration failed:', error);
      }
   

    }
    return(
        <>
       
        <form className="register_form" onSubmit={handleSubmit}>
          <h3 className="register_title">UserRegistration</h3>
            <label className="register_lable">Name</label>
            <input className="register_input" type="text" placeholder="enter you Name" value={formdata.name} name="name" onChange={handlerRegister}/><br/>
            <label className="register_lable">Age</label>
            <input className="register_input_number" type="number" placeholder="enter you Age" value={formdata.age} name="age" onChange={handlerRegister}/><br/>
            <label className="register_lable">password</label>
            <input className="register_input" type="password" placeholder="enter you 4 digit password" value={formdata.password} name="password" onChange={handlerRegister}/><br/>
            <label className="register_lable">Select Role</label>
            <input type="radio" value="USER"  checked={formdata.roles === 'USER'} name="roles" onChange={handlerRegister}/>USER
            <input type="radio" value="ADMIN"  checked={formdata.roles === 'ADMIN'} name="roles" onChange={handlerRegister}/>ADMIN<br/>
       <input className="register_submit" type="submit" title="Click to Register" value= "Register" />
        </form>
        
        </>
    )
}
export default Register