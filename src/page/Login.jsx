// import { render } from '@testing-library/react';
import React, { useState } from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { registerRoute,loginRoute} from '../apiRouter';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate =useNavigate();
  const toastOption = {
      position:'bottom-right',
      autoClose:'8000',
      pauseOnHover:true,
      draggable:true,
      theme:'dark'
    }
    const [values, setValues] = useState({
        username: "",
        email:"",
        phone:"",
        password:"",
        confirmpassword:""
    })
    const handlechange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleValidation =()=>{
        const {username,password,confirmpassword} = values;
        if(username.length < 3){
          toast.error('Uername should be greater than 3 characters',toastOption);
          return false;
        } else if(password.length < 8){
          toast.error('Password should be greater than 8 characters',toastOption);
          return false;
        } else if(password !== confirmpassword){
          toast.error('Password and Confirm password should be same',toastOption);
          return false;
        }
        return true
  }
  localStorage.getItem("chat-app")
  const handleSubmit = async (event)=>{
    event.preventDefault();
    try{
    if(handleValidation()){
      const {username,email,password,confirmpassword} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
        confirmpassword
      })
      if(data.status === false){
        toast.error(data.msg,toastOption);
      }
      if(data.status === true){
        delete data.chat.password;
        delete data.chat.confirmpassword;
        localStorage.setItem("chat-app",JSON.stringify(data))
        navigate('/avatar');
      }
    }
  }catch(err){
    console.log(err)
  }
  }
  const [values1, setValues1] = useState({
    email:"",
    password:""
  })
const handlechange1 = (event) => {
    setValues1({ ...values1, [event.target.name]: event.target.value })
}
const handleValidation1 =()=>{
  const {email,password} = values1;
  if(email === ""){
    toast.error('Invalid Login Details',toastOption);
    return false;
  }
 else if(password === ""){
    toast.error('Invalid Login Details',toastOption);
    return false;
  }
  return true;
}
localStorage.getItem("chat-app-user")
  const handleSubmit1 = async (event)=>{
    event.preventDefault();
    try{
    if(handleValidation1()){
      const {email,password} = values1;
      const {data} = await axios.post(loginRoute,{
        email,
        password
      })
      if(data.status === false){
        toast.error(data.msg,toastOption);
      }
      if(data.status === true){
        delete data.useremail.password;
        delete data.useremail.confirmpassword;
        localStorage.setItem("chat-app-user",JSON.stringify(data))
        localStorage.setItem("token",JSON.stringify(data.token))
        navigate('/chat');
      }
    }
  }catch(err){
    console.log(err)
  }
}
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('far fa-eye');

    const showPassword= ()=>{
        if(type==='password'){
            setIcon('far fa-eye-slash');
            setType('text');
        }
        else{
            setIcon('far fa-eye');
            setType('password')
        }
    }
    const [radio, setRadio] = useState(true);

    const handleChange = () => {
      setRadio(current => !current);
    };
 const forget=()=>{
  navigate("/forget")
 }
      return (
    <>
   <FormContainer>   
          <div className="containers">
        <div className="title-text">
            <div className=" title login">
                Login Form
            </div>
            <div className="title signup">
                Signup Form
            </div>
        </div>
    
    <div className="form-container">
      <div className="slide-tag">
        <input type="radio" name="slider" id="login"  defaultChecked={true} value={radio} onChange={handleChange}></input>
        <input type="radio" name="slider" id="signup"  defaultChecked={false} value={radio} onChange={handleChange}></input>
        <label htmlFor="login" className="slide login" onClick={()=>{
                 document.querySelector("form.login").style.marginLeft = "0%";
                 document.querySelector(".title-text .login").style.marginLeft = "0%";
                document.querySelector("#icon").style.visibility = "visible";
                 document.querySelector("#icon-1").style.visibility = "hidden";
        }}>Login</label>
        <label htmlFor="signup" className="slide signup" onClick={()=>{
            document.querySelector("form.login").style.marginLeft = "-50%";
            document.querySelector(".title-text .login").style.marginLeft = "-50%";
            document.querySelector("#icon").style.visibility = "hidden";
            document.querySelector("#icon-1").style.visibility = "visible";
        }} >Signup</label>
        <div className="slide-tab"></div>   
       </div>
        <div className="form-inner">
          <form onSubmit={(event) => handleSubmit1(event)} className="login">
            <div className="field">
            <span ><i className="fas fa-user ic"></i></span>
            <input onChange={(e)=>handlechange1(e)} type="email" className="email" name="email" placeholder="Enter Email" required></input>
            </div>
            <div className="field">
            <span ><i className="fas fa-lock ic"></i></span>
            <input onChange={(e)=>handlechange1(e)}  type={type} className="password" id="icon-2" name="password" placeholder="Enter Password" required></input>
            <span className='icons' id="icon" onClick={showPassword}><i className={icon} id="togglePassword"></i></span>
            </div>
            <div className="pass-link">
            <a href onClick={()=>forget()} >Forgot password?</a>
            </div>
            <div className="field">
              <input type="submit" className="button" id="input" value="Login"></input>
            </div>
            <div className="signup-link">Not a member?
              <a href onClick={()=>{
            document.querySelector("form.login").style.marginLeft = "-50%";
            document.querySelector(".title-text .login").style.marginLeft = "-50%";
            document.querySelector("#icon").style.visibility = "hidden";
            document.querySelector("#icon-1").style.visibility = "visible";
        }}>Sign Up</a>
            </div>
          </form>
          <form onSubmit={(event) => handleSubmit(event)} className="signup">
            <div className="field">
             <span ><i className="fas fa-user ic"></i></span>
            <input onChange={(e)=>handlechange(e)} type="name" name="username" placeholder="Enter Username" required></input>
            </div>
            <div className="field">
            <span ><i className="fas fa-at ic" ></i></span>
            <input onChange={(e)=>handlechange(e)} type="email" name="email" placeholder="Enter Email" required></input>
            </div>
            <div className="field">
            <span ><i className="fas fa-lock ic" ></i></span>
            <input type={type} onChange={(e)=>handlechange(e)} className="password" id="icon-3" name="password" placeholder="Enter Password" required></input>
            <span className='icons' id="icon-1" onClick={showPassword}><i className={icon} id="togglePassword-1"></i></span>
            </div>
            <div className="field">
            <span ><i className="fas fa-lock ic" ></i></span>
            <input onChange={(e)=>handlechange(e)} type="password"  name="confirmpassword" placeholder="Enter Again Password" required></input>
            </div>
            <div className="field">
              <input type="submit" className="button" id="input" value="Sign Up"></input>
            </div>
          </form>
          
        </div>
    </div>
  </div>
  <ToastContainer />
  </FormContainer>
  </>
  )
}

const FormContainer = styled.div`
.containers{
  overflow: hidden;
  height: 367px;
  width: 366px;
  background:rgba(255,255,255,.1);
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
  border-top: 1px solid rgba(255,255,255,.3);
  border-left: 1px solid rgba(255,255,255,.3);
  backdrop-filter: blur(10px);
}
.containers .title-text{
  display: flex;
  width: 200%;
}
.containers .title-text .title{
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  color: #faebd7;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.565,1.55);
 }
.containers .form-container{
  width: 100%;
}
.form-container .form-inner form .field{
  height: 28px;
  width: 100%;
  margin-top: 13px;
}
.form-inner form .field input{
    height: 100%;
    width: 100%;
    outline: none;
    padding-left: 20px;
    font-size: 15px;
    border-radius: 5px;
    color:antiquewhite ;
    border: 1px solid #719ff3;
    border-bottom-width: 3px;
    transition: all 0.4s ease;
    background: rgba(0,0,0,0.1);
    box-shadow: 0 0 5px rgba(0,0,0,.3) inset;  
}
input::-webkit-input-placeholder{
  color: antiquewhite;
}
.form-inner form .field input:focus{
  border-color: #0f8fed;
}
.form-inner form .pass-link {
  margin-top:5px;
}
.form-inner form .pass-link a,
.form-inner form .signup-link a{
  text-decoration: none;
  color:#56f2c9db;
  cursor: pointer;
}
.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover{
  text-decoration: underline;
}
form .field input[type="submit"]{
  color:#fff;
  font-size: 17px;
  font-weight: 50;
  border: none;
  cursor: pointer;
  box-shadow: none;
  background: -webkit-linear-gradient(92deg, #56f2c970, #4b42b26b);
}
#input{
  padding:0px 0px;
}
form .field input[type="submit"]:hover{
  font-size: 21px;
  letter-spacing: 1px;
}
.form-inner form .signup-link{
  text-align: center;
  margin-top: 10px;
  color: antiquewhite;
}
.form-container .form-inner{
  display: flex;
  width: 200%;
}
.form-container .form-inner form{
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.565,1.55);
}
.container .form-container{
  width: 100%;
  overflow: hidden;
}
.form-container .slide-tag{
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  /* border: 1px solid lightgray; */
}
.slide-tag .slide{
  height: 100%;
  width: 100%;
  z-index: 1;
  color: antiquewhite;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  transition: all 0.6s ease;
}
.slide-tag .signup{
  color: antiquewhite;
}
.slide-tag .slide-tab{
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 5px;
  background: -webkit-linear-gradient(92deg, #56f2c970, #4b42b26b);
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.565,1.55);
}
input[type="radio"]{
  display: none;
}
#signup:checked ~ .slide-tab{
  left:50%;
}
#signup:checked ~ .signup{
  color: antiquewhite;
}
#signup:checked ~ .login{
  color: antiquewhite;
}
span{
  position: absolute;
  margin: 2px 3px;
}
.icons{
  position: absolute;
  margin: 0px -25px;
  color:#56f2c9db;

}
.ic{
  color:#56f2c9db;
}
#icon-1{
  visibility:hidden;
}
#togglePassword{
  color:#56f2c9db;
  cursor: pointer;   
}
#togglePassword-1{
  color:#56f2c9db;
  cursor: pointer;
}`
export default Login