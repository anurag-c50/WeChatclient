import React ,{ useEffect, useState ,useRef } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatContainer from "../components/ChatContainer"
import axios from 'axios';
import { getUSer} from '../apiRouter';
import {io} from "socket.io-client";
export default function Chat() {
  const navigate = useNavigate();
    const [currentuser,setCurrentUser] = useState(undefined);
    const [currentUserId,setCurrentUserId] = useState(undefined);
    const [activeUser,setActiveUser] = useState([]);
    const [currentChat,setCurrentChat] = useState(undefined);
    const [userSelected,setuserSelected] = useState([]);
    const [userData,setUserData] = useState([])
    const [contacts,setContacts] = useState([]);
    const [deleteChat,setDeleteChat] = useState(false);
      useEffect(()=>{
      async function getUsersData(){
        try{
        if(currentChat === undefined){return}else{
        const UserId = currentChat.members.find((id)=>id !== currentUserId)
        const getUserData = await axios.post(getUSer,{
          id:UserId,
        })
        setUserData(getUserData.data);
        }
      }catch(err){
      console.log(err)
    }
  }
        getUsersData();
    },[currentUserId,currentChat]) 
   const socket = useRef();
    useEffect(()=>{
      socket.current = io("https://wechatservers.onrender.com")
    },[])
    useEffect(() =>{
      async function setlocalstorage(){
        try{
      if(!localStorage.getItem('chat-app-user')){
       navigate('/');
      }else{
       setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    }catch(err){
    console.log(err)
  }
}
    setlocalstorage();
  },[navigate])
  useEffect( ()=>{
    if(currentuser){
      setCurrentUserId(currentuser.useremail._id);
    }
  },[currentuser])
  
const handleChatChange = (chat) =>{
  setCurrentChat(chat);
}
useEffect(()=>{
  if(currentUserId){
  socket.current.emit("new-user-add",currentUserId)
  socket.current.on("get-user",users=>{
    setActiveUser(users);
  })
  }else{
    return
  }
},[currentUserId,socket])

  return (
    <>
    <Container>
       <div className="container">
       <div className="box-1">
       <Contacts setDeleteChat={setDeleteChat} activeUser={activeUser} contacts={contacts} setContacts={setContacts} userDatas={userData} socket={socket} currentChat={handleChatChange} setuserSelected={setuserSelected} currentuser={currentuser}/>
       </div>
       <div className="box-2">
        <ChatContainer deleteChat={deleteChat} socket={socket} currentuser={currentuser} currentChat={currentChat} userSelected={userSelected} currentUserId={currentUserId} />
       </div>
       </div>
    </Container></>
  )
}
const Container = styled.div`
.container{
	height:85vh;
    width:85vw;
    // border: 2px solid;    
    display: grid;
    grid-template-columns: 32% 75%;
}
.box-1{
	width: 19vw;
	height: 84vh;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
  border-top: 1px solid rgba(255,255,255,.3);
  border-left: 1px solid rgba(255,255,255,.3);
  backdrop-filter: blur(10px);
	border-radius: 15px !important;

}
.box-2{
	width: 50vw;
	height: 84vh;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
  border-top: 1px solid rgba(255,255,255,.3);
  border-left: 1px solid rgba(255,255,255,.3);
  backdrop-filter: blur(10px);
	border-radius: 15px !important;
}`;