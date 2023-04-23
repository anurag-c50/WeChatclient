import React, { useState } from 'react';
import styled from 'styled-components';
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import { forgetRoute } from '../apiRouter';
export default function Forget() {
  const toastOption = {
    position:'bottom-right',
    autoClose:'8000',
    pauseOnHover:true,
    draggable:true,
    theme:'dark'
  }
  const notify ={
    position:'bottom-right',
    pauseOnHover:true,
    draggable:true, 
}
  const [message,setMessage] = useState("")
  const [email,setEmail] = useState("");
      const setval = (e)=>{
        setEmail(e.target.value)
      }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
    const {data} = await axios.post(forgetRoute,{
      email,
    })
    if(data.status === false){
      toast.error(data.msg,toastOption);
    }
    if(data.status === true){
      toast.success("Password Reset Link Send Successfully in Your Email",notify)
      setEmail("");
      setMessage(true)
    }
  }catch(err){
    console.log(err)
  }
  }
  return (
    <>
    <FormContainer>
    <div className="container">
    <div className="form-container">
        <div className="h1">
            <h1>Reset Password</h1>
        </div>
        <div className="field-1">
        <p>Enter The Email To Get Link For Password Reset</p>
       </div>
       <div className="form-inner">
           <form onSubmit={(event) => handleSubmit(event)} className="login">
            <div className="field">
            <span>
            <i className="fas fa-at ic" ></i>
            </span>
            <input type="email" value={email} onChange={(e)=>setval(e)} className="email" name="email" placeholder="Enter Email" required></input>
            </div>
            <div className="field">
              <input type="submit" className="button" value="submit"></input>
            </div>
          </form>
         </div>
     </div>
     </div>-
     <ToastContainer />
   </FormContainer>
   </>
   )
 }
 
 const FormContainer = styled.div`
 .container{
  height: 221px;
  width: 530px;
  border-radius: 6px;
  overflow: hidden;
  background:rgba(255,255,255,.1);
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
  border-top: 1px solid rgba(255,255,255,.3);
  border-left: 1px solid rgba(255,255,255,.3);
  backdrop-filter: blur(10px);
}
.h1{
  color:antiquewhite;
  font-size: 18px;
  text-align: center;
}
.field-1{
  color:antiquewhite;
  font-size: 19px;
  text-align: center;
}
.container .form-container{
  width: 100%;
}
.form-container .form-inner form .field{
  height: 30px;
  width: 100%;
  margin-top: 20px;
}
.form-inner form .field input{
  height: 100%;
  width: 80%;
  outline: none;
  font-size: 15px;
  border-radius: 5px;
  color:antiquewhite ;
  border: 1px solid #719ff3;
  border-bottom-width: 3px;
  transition: all 0.4s ease;
  background: rgba(0,0,0,0.1);
  box-shadow: 0 0 5px rgba(0,0,0,.3) inset;  
}
.email{
  padding-left: 24px;
}
input::-webkit-input-placeholder{
  color: antiquewhite;
}
.form-inner form .field input:focus{
  border-color: #0f8fed;
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
form .field input[type="submit"]:hover{
  font-size: 21px;
  letter-spacing: 4px;
}
span{
  position: absolute;
  margin: 3px 3px;
}
.ic{
  color:#56f2c9db;
}
@media only screen and (max-width: 550px) {
  .container{
    height: 221px;
    width: 468px;
  }
}
}
@media only screen and (max-width: 486px) {
  .container{
    height: 236px;
    width: 389px;
  }
}
@media only screen and (max-width: 398px) {
  .container{
    height: 248px;
    width: 347px;
  }
}`;