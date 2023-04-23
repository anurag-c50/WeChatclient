import React , { useState} from 'react';
import styled from 'styled-components';
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import {useParams } from 'react-router-dom';
export default function Resetpassword() {
  const notify ={
    position:'bottom-right',
    pauseOnHover:true,
    draggable:true, 
  }
    const {id,token} = useParams();
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
    const toastOption = {
        position:'bottom-right',
        autoClose:'8000',
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
      }
      const [password,setPassword] = useState("");
      const setval = (e)=>{
        setPassword(e.target.value)
      }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
        const {data} = await axios.get(`https://wechatservers.onrender.com/api/resetpassword/${id}/${token}`,{
            password,
          })
          if(data.status === true){
           console.log("User valid");
          }
          if(data.status === false){
            toast.error(data.msg,toastOption);
          }
      }catch(err){
        console.log(err)
      }
    }

      const setpassword = async (e)=>{
        e.preventDefault();
        try{
        const {data} = await axios.post(`https://wechatservers.onrender.com/api/${id}/${token}`,{
            password,
          })
          if(data.status === true){
            toast.success("Password Successfully Update",notify)
            setPassword("");
          }
          else{
            toast.error("Link has been expired");
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
            <h1>Welcome</h1>
        </div>
        <div className="field-1">
        <p>Enter Your New Password</p>
       </div>
        <div className="form-inner">
    <form  onSubmit={(event) => handleSubmit(event)} className="login">
        <div className="field">
        <span className='span'>
            <i className="fas fa-at ic" ></i>
        </span>
            <input type={type} onChange={setval} value={password} className="password" id="icon-2" name="password" placeholder="password" required></input>             
            <span id="icon"onClick={showPassword}><i className={icon} id="togglePassword"></i></span>
        </div>
            <div className="field">
              <input type="submit" onClick={setpassword} className="button" value="submit"></input>
            </div>
      </form>
    </div>
</div>
</div>
<ToastContainer/>
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
    color: antiquewhite;
    font-size: 18px;
    text-align: center;
}

.field-1{
    font-size: 25px;
    text-align: center;
    color: antiquewhite;
}
.container .form-container{
    width: 100%;
}
.form-container .form-inner form .field{
    height: 30px;
    width: 100%;
    margin-top: 11px;
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
form .field input[type="submit"]{
  color:#fff;
  font-size: 17px;
  font-weight: 50;
  border: none;
  cursor: pointer;
  box-shadow: none;
  background: -webkit-linear-gradient(92deg, #56f2c970, #4b42b26b);
}
input::-webkit-input-placeholder{
  color: antiquewhite;
}
.form-inner form .field input:focus{
  border-color: #0f8fed;
}
form .field input[type="submit"]:hover{
  font-size: 21px;
  letter-spacing: 4px;
}
#togglePassword{
    color: #56f2c9db;
    cursor: pointer;   
    display: flex;
    justify-content: end;
    margin-block-start: -24px;
    margin-inline-end: 69px;   
}
.password{
  padding-left:24px;
}
.span{
  position: absolute;
  margin: 3px 3px;
}
.ic{
  color:#56f2c9db;
}
@media only screen and (max-width: 564px) {
  .container{
    height: 221px;
    width: 394px;
  }
  #togglePassword{
    margin-inline-end: 51px;   
}
}
@media only screen and (max-width: 402px) {
  .container{
    height: 221px;
    width: 344px;
  }
  #togglePassword{
    margin-inline-end: 51px;   
}
}`;
