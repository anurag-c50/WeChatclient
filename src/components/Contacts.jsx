import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Conversation from './Conversation';
import Conversations from './Conversations';
import { searchUser,Addconversation,Conversationget,Conversationdelete} from "../apiRouter";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Contacts({setDeleteChat,activeUser,currentChat,currentuser,setuserSelected,userDatas}) {
  const [currentUserSelected,setCurrentUserSelected] = useState(undefined);
  const [selectedId,setSelectedId] = useState(undefined);
  const [contacts,setContacts] = useState([]);
  const [searchResult,setsearchResult]=useState([]);
  const [search,setsearch]=useState([]);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage,setCurrentUserImage] = useState(undefined);
  const [currentUserId,setCurrentUserId] = useState(undefined);

  const navigate =useNavigate();
  useEffect( ()=>{
    if(currentuser){
      setCurrentUserImage(currentuser.useremail.avatarImage);
      setCurrentUserName(currentuser.useremail.username);
      setCurrentUserId(currentuser.useremail._id);
    }
  },[currentuser])
  const [name,setName] = useState("");
  const setval = (e)=>{
    setName(e.target.value)
    if(e.target.value===""){
      return setsearchResult("")
    }
    const results = search.filter((user)=>{
      return(
        name && user && user.username && user.username.toLowerCase().includes(name.toLowerCase())
      )
    })
      setsearchResult(results);
    }
  useEffect(()=>{
    async function getalluserdata(){
      try{
      const {data} = await axios.post(`${searchUser}`,{
        senderId:currentUserId,
      });
      setsearch(data.data.filter((user)=>user._id!==currentUserId))
    }catch(err){
    console.log(err)
   }
  }
    getalluserdata();
  },[currentUserId])
useEffect( ()=>{
  async function getData(){
    try{
    if(JSON.parse(localStorage.getItem('token'))){
      const {data} = await axios.post(Conversationget,{
      senderId:currentUserId,
    },{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    if(data.status===false){
      navigate("/")
    }
    setContacts(data);
    setsearchResult("");
  }
 }catch(err){
  console.log(err)
 }
}
  getData();
},[currentUserId])

const SelectContactId=(data)=>{
  setSelectedId(data._id)
}
const AddConversation = async()=>{
  try{
  const {data} = await axios.post(Addconversation,{senderId:currentUserId,reciverId:selectedId})
  setContacts(contacts.concat(data))
  setName("");
  }catch(err){
    console.log(err)
  }
}
const DeleteConversation = async(index)=>{
  try{
  await axios.post(Conversationdelete,{senderId:currentUserId,reciverId:userDatas._id})
  setDeleteChat(true);
  setCurrentUserSelected(undefined)
  const updatedItems = contacts.filter((item, i) => i !== index);
  setContacts(updatedItems);
  }catch(err){
    console.log(err)
  }
}
const ChangeCurrentChat = (index,contact)=>{
  setCurrentUserSelected(index);
  setuserSelected(contact)
  currentChat(contact);
  setDeleteChat(false)
}

const checkOnlineStatus = (contact)=>{
  const Chatmember = contact.members.find((member)=>member !== currentUserId);
  const online = activeUser.find((user)=>user.userId === Chatmember)
  return online ? true : false
}
  return (
    <>{currentUserImage && currentUserName && (
      <Container>
        <div className="card-header">
        <form onSubmit={(e)=>e.preventDefault()} className="login">
    
      <div className="searchbox">
      <input type="text" placeholder="Search..." value={name} onChange={(e)=>setval(e)} name="" className="search"></input>
  <div className="input-group-prepend">
      <span onClick={()=>setName("")} className="input-group-text search_btn"><i className={`icon fas ${name===""?"fa-search":"fa-times"}`}></i></span>
  </div>
  </div>
  </form>
  <ToastContainer />
  </div>
  <div className="card-Body contacts_body">
  { name!==""?( 
      searchResult.map((searchresult,index)=>{
        return(
          <div
          className="contact" 
          key={index}   
       >
       <Conversations userData={searchresult} />
       <span className='add' onMouseOver={()=>SelectContactId(searchresult)}><i onClick={AddConversation} className="fas fa-plus"></i></span>
       </div>
       )})
       ):(
     contacts.map((contact,index)=>{
      return(
       <div 
         className={`contact ${
          index === currentUserSelected ? "selected" : ""
        }`
      }
      key={contact._id||index}
        onClick={()=>ChangeCurrentChat(index,contact)}
        >
          <Conversation online={checkOnlineStatus(contact)} data={contact} currentUserId={currentUserId}/>
          <span className='delete' ><i className="fa fa-trash" onClick={()=>DeleteConversation(index)} aria-hidden="true"></i></span>
        </div>
      )
    })
        )}
  </div>
  <div className="card-footer"> 
   <div className="active">
                <div className="img-contmain">   
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} 
                    alt="avatar" /></div>
                <div className="userinfomain">
                    <span className="usernamemain">{currentUserName}</span>
                </div>
                </div>
                </div>
 </Container> 
)}    </>
  )
}
const Container = styled.div`
.card-header{
	height: 9vh;
	background-color: rgba(0, 0, 0, 0.2) !important;
	/* border: 2px solid black; */
	border-radius: 15px 15px 0 0 !important;
}
.searchbox{
	display: flex;
}
.icon{
  font-size:20px;
}
.search{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0, 0, 0, 0.4) !important;
	border: 2px solid transparent;
	width: 100%;
	height: 5vh;
	padding: 0px 13px;
	color: antiquewhite;
}
.search:focus{
	outline: 0;
}
.add{
  color:antiquewhite;
  position: absolute;
  right: 17px;
  top: 40px;
}
.delete{
  color:antiquewhite;
}
.search-icon{
	margin: 0px 3px;
}
.search_btn{
	background-color: rgba(0, 0, 0, 0.4) !important;
	color:antiquewhite;
	border: 0;
	cursor: pointer;
	border-radius: 0 15px 15px 0;
}
.card-Body{
	height: 66vh;
	background-color: rgba(0, 0, 0, -0.9) !important;
  padding:10px;
	overflow-y: auto;
}
.card-footer{
	height: 9vh;
	background-color: rgba(0, 0, 0, 0.25) !important;
	/* border: 2px solid black; */
	border-radius: 0 0 15px 15px !important;
}
.contacts_body{
  display:flex;
  flex-direction: column;
  align-items: center;
  overflow:auto;
  gap:0.8rem;
}
.contact{
	background-color: rgba(0, 0, 0, 0.1) !important;
  min-height: 12vh;
  cursor: pointer;
  width: 100%;
  border-radius: 18px;
  padding: 5px;
  display: flex;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
  border-top: 1px solid rgba(255,255,255,.3);
  border-left: 1px solid rgba(255,255,255,.3);
  backdrop-filter: blur(10px);
  align-items: center;
  transition: 0.5s ease-in-out;
  position: relative;
  .delete{
    visibility: hidden;
  }
  .avatar{
    display:flex;
    justify-content: space-between;
    .img-cont{
      width: 5vw;
      height: 10vh;
    }
    .userinfo span{
      color: antiquewhite;
      font-size: 24px;
    }
    .userinfo p{
      color: antiquewhite;
      font-size: 13px;
    }
  }
}
.selected {
  .delete{
    visibility: hidden;
    position: absolute;
    left: 129px;
    top: 40px;
    }
  background-color: rgba(0, 0, 0, 0.28) !important;
}
.selected:hover{
  .delete{
    visibility: visible;
    }
}
// .img-cont{
// 	width: 5vw;
// 	height: 101h;
// 	/* border: 2px solid black; */
// }
.userinfo span{
	color: antiquewhite;
	font-size: 24px;
}
.userinfo p{
	color: antiquewhite;
	font-size: 13px;
}
.active{
	display: flex;
}
.img-contmain{
	width: 3vw;
	height: 7vh;
	/* border: 2px solid black; */
}
.userinfomain span{
	color: antiquewhite;
	font-size: 24px;
}
.userinfomain p{
	color: antiquewhite;
	font-size: 13px;
}
.img-cont-msg{
	/* border: 2px solid black; */
	width: 5vw;
	height: 8vh;
}`;