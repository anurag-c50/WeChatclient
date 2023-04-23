import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { json, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { profileUpdate } from '../apiRouter';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Profile() {
  const navigate = useNavigate();
    const [currentUserId,setCurrentUserId] = useState(undefined);
    const [currentUserImage,setCurrentUserImage] = useState(undefined);
    const [currentUserName,setCurrentUserName] = useState(undefined);
    const [currentUserEmail,setCurrentUserEmail] = useState(undefined);
    const [userName,setUserName] = useState(undefined);
    const [userEmail,setUserEmail] = useState(undefined);
    const [disabledButton,setDisabledButton] = useState(true);
    const [disabledButton1,setDisabledButton1] = useState(true);
    const notify ={
        position:'bottom-right',
        pauseOnHover:true,
        draggable:true, 
    }
  useEffect(() =>{
    async function setlocalstorage(){
      try{
    if(!localStorage.getItem('chat-app-user')){
     navigate('/');
    }else{
     setCurrentUserId(await JSON.parse(localStorage.getItem('chat-app-user')).useremail._id)
     setCurrentUserImage(await JSON.parse(localStorage.getItem('chat-app-user')).useremail.avatarImage)
     setCurrentUserEmail(await JSON.parse(localStorage.getItem('chat-app-user')).useremail.email)
     setCurrentUserName(await JSON.parse(localStorage.getItem('chat-app-user')).useremail.username)
    }
  }catch(err){
    console.log(err)
  }
}
  setlocalstorage();
},[navigate])
const setval=(e)=>{
  setUserName(e.target.value)
}
const setval1=(e)=>{
  setUserEmail(e.target.value)
}
const apply=async(e)=>{
  e.preventDefault();
  try{
  const user = await JSON.parse(localStorage.getItem("chat-app-user"));
  if(userName!==undefined){
    await axios.post(profileUpdate,{
      id:currentUserId,
      name:userName
    })
    user.useremail.username = userName;
    localStorage.setItem("chat-app-user",JSON.stringify(user))
    setDisabledButton(true);
    document.querySelector("#update").style.visibility = "visible";
    document.querySelector("#apply").style.visibility = "hidden";
    toast.success("Name Updated",notify)
  }else if(userEmail!==undefined){
    await axios.post(profileUpdate,{
      id:currentUserId,
      email:userEmail  
    })
    user.useremail.email = userEmail;
    localStorage.setItem("chat-app-user",JSON.stringify(user))
    setDisabledButton1(true);
    document.querySelector("#update1").style.visibility = "visible";
    document.querySelector("#apply1").style.visibility = "hidden";
    toast.success("Email Updated",notify)
  }
}catch(err){
  console.log(err)
}
}
const disabled=(event)=>{
  event.preventDefault();
  setDisabledButton(false);
  document.querySelector("#update").style.visibility = "hidden";
  document.querySelector("#apply").style.visibility = "visible";
}
const disabled1=(event)=>{
  event.preventDefault();
  setDisabledButton1(false);
  document.querySelector("#update1").style.visibility = "hidden";
  document.querySelector("#apply1").style.visibility = "visible";
}
  return (
    <Container>
    <div className='profile-container'>
    <i class="fa fa-arrow-left" aria-hidden="true" id='leftArrow' onClick={()=>navigate("/chat")}></i>
    <div className="header">Profile</div>
    <div className="profile-img-update">
    <div className="profile-img"><img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" /></div>
    <form className='img-update'><input type="submit" value="Update" onClick={()=>navigate("/avatar")} /></form>
    </div>
    <form className='person-info' onSubmit={(e)=>apply(e)}>
    <input type="usermane" className='input' onChange={(e)=>setval(e)} placeholder={currentUserName} disabled={disabledButton}/>
    <input type="submit" id="update" className='button' value="Update" onClick={(event)=>disabled(event)} />
    <input type="submit" id="apply" className='button ' value="Apply" />
    <input type="email" className='input' onChange={(e)=>setval1(e)} placeholder={currentUserEmail} disabled={disabledButton1}/>
    <input type="submit" id="update1" className='button' value="Update" onClick={(event)=>disabled1(event)}/>
    <input type="submit" id="apply1" className='button ' value="Apply" />
    </form>
    </div>
    <ToastContainer/>
    </Container>
  )
}
const Container = styled.div`
.profile-container{
  height: auto;
  width: 480px;
  background-color: rgba(255, 255,255, 0.2);
	box-shadow: 0 5px 15px rgba(0,0,0,.3);
	border-top: 1px solid rgba(255,255,255,.3);
	border-left: 1px solid rgba(255,255,255,.3);
	backdrop-filter: blur(10px);
}
.header{
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: antiquewhite;
    font-size: 37px;
}
.profile-img img{
  height: 121px;
  width: auto;
  border: 10px solid #3f63dc;
  border-radius: 100%;
  padding: 5px;
  box-shadow: 0px 5px 15px rgb(0 0 0 / 63%);
  border-top: 0px solid rgba(255,255,255,0.1);
  border-left: 0px solid rgba(255,255,255,0.1);
}
.person-info{
    height: 232px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;  
}
.profile-img{
  height: auto;
  margin-top: 14px;
}
.profile-img-update{
  height: 182px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.input{
  width:auto;
  outline: none;
  font-size: 15px;
  border-radius: 5px;
  color:antiquewhite ;
  border: 1px solid #719ff3;
  border-bottom-width: 3px;
  transition: all 0.4s ease;
  background: rgba(0,0,0,0.1);
  box-shadow: 0 0 5px rgba(0,0,0,.3) inset;  
  text-align: center;
}
.input::-webkit-input-placeholder{
  color: antiquewhite;
}
.input:focus{
  border-color: #0f8fed;
}
form input[type="submit"]{
  color:#fff;
  font-size: 17px;
  font-weight: 50;
  border: none;
  cursor: pointer;
  width: 114px;
  border-radius: 6px;
  background: -webkit-linear-gradient(92deg, #56f2c970, #4b42b26b);
}
form input[type="submit"]:hover{
  font-size: 18px;
  letter-spacing: 4px;
}

#apply{
  margin-top:-50px;
  visibility: hidden;
}
#apply:hover{
  letter-spacing: 4px;
}
#apply1{
  margin-top:-50px;
  visibility: hidden;
}
#apply1:hover{
  letter-spacing: 4px;
}
#leftArrow{
  color: antiquewhite;
  margin-left: 8px;
  margin-top: 7px;
  cursor: pointer;
  font-size: 20px;
}
@media only screen and (max-width: 500px) {
.profile-container{
  height: auto;
  width: 398px;
  }
}
@media only screen and (max-width: 412px) {
  .profile-container{
    height: auto;
    width: 330px;
    }
  }`;