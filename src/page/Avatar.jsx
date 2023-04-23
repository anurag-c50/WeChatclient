import React from 'react'
import styled from 'styled-components'
import {Buffer} from "buffer";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import { setAvatar } from '../apiRouter';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/PuffLoader";
import { useState,useEffect  } from 'react';
export default function Avatar() {
  const navigate = useNavigate();
  const toastOption = {
    position:'bottom-right',
    autoClose:'8000',
    pauseOnHover:true,
    draggable:true,
    theme:'dark'
  }
  // const api = "";
  const [avatars,setAvatars] = useState([]);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);
  const [usersLoading, setUsersLoading] = useState(true);
 
  const setprofilePicture  = async (event) =>{
   event.preventDefault();
   try{
    if(selectedAvatar === undefined){
      toast.error("Please select an avatar",toastOption)
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app"))
      const user1=await JSON.parse(localStorage.getItem("chat-app-user"))
        const {data} = await axios.post(setAvatar,{
        avatarImage: avatars[selectedAvatar],
        users:user,
        users1:user1,
      })
      // console.log(8)
      if(data.status === true){
        if(user1){
        user1.useremail.avatarImage = avatars[selectedAvatar];
        localStorage.setItem("chat-app-user",JSON.stringify(user1));
        navigate("/chat")
        }else{
          user.chat.isAvatarImageSet = true;
          user.chat.avatarImage = avatars[selectedAvatar];
          localStorage.setItem("chat-app",JSON.stringify(user));
          navigate("/");
        }
      }else{
          toast.error("Please try again",toastOption)
        }
    }}catch(err){
      console.log(err)
    }
  };
  useEffect( () => {
    async function fetchData() {

    for(let i = 0; i < 10; i++){
    try{
      const data = [];
      
    for(let i = 0; i < 2; i++){
      const image = await axios.get(`https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
      setAvatars(data);
      setUsersLoading(false);
  }
catch(error){
  console.log(error);
  continue
    }}}
fetchData();
},[])
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  
  
  return (
    <>
    {usersLoading ? <Container>
      <ClipLoader
        color={"#3158d9"}
        loading={usersLoading}
        cssOverride={override}
        size={450}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Container>:(
    <Container>
      <div className="title">
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className='avatars'>{
        avatars.map((avatar,index)=>{
          return(
            <div
            key={index}
            className = {`avatar ${selectedAvatar === index ? "selected" : ""
          }`}
            >
              <img src={`data:image/svg+xml;base64,${avatar}`} 
              alt="avatar"
              key={avatar}
              onClick={()=>setSelectedAvatar(index)}
              />
            </div>
           )
        })
      }</div>
      <button className='button' onClick={setprofilePicture}>SET AS PROFILE PICTURE</button>
      <ToastContainer />
      </Container>
      )}
      </>
  )
}
const Container = styled.div`
{
display:flex;
flex-direction:column;
align-items:center;
gap:15px;
.title{
  color:white;
}
.avatars {
  display: flex;
  gap: 2.6rem;
  .avatar {
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    box-shadow: 0 5px 15px rgba(0,0,0,.3);
    border-top: 1px solid rgba(255,255,255,.3);
    border-left: 1px solid rgba(255,255,255,.3);
    backdrop-filter: blur(10px);
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
}
.selected{
  border: 0.6rem solid #3158d9;
}
button{
  background-color:#0e75ff;
  color:aliceblue;
  border:4px solid #3158d9;
  border-radius:9px;
  outline:none;
  cursor:pointer;
}
button:hover{
  border:6px solid #3158d9;
}`;