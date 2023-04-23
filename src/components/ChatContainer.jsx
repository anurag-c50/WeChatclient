import React from 'react'
import styled from 'styled-components'
import { useState,useEffect,useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './Welcome';
import Msgbox from './Msgbox';
import Chatheader from './Chatheader';
import Chatheaderblank from './Chatheaderblank';
import { Messageadd,Messageget,getUSer } from '../apiRouter';
import axios from 'axios';
import {BsEmojiSmileFill} from "react-icons/bs";
import Picker from "emoji-picker-react"
import { useNavigate } from 'react-router-dom';

export default function ChatContainer({deleteChat,socket, receiveMessage,currentChat,currentUserId,currentuser,userSelected}) {
	const [value,setValue] = useState("")
	const [arrivalMessage,setArrivalMessage] = useState(undefined)
	const [userData,setUserData] = useState([]);
	const [showEmojipicker,setShowEmojipicker] = useState(false);
	const [showMenu,setShowMenu] = useState(false);
	const navigate =useNavigate();
	const dialog = useRef(null);
	const dialog1 = useRef(null);
	const manageOutsideClick=(event)=>{
		if(!dialog.current.contains(event.target)){
			setShowMenu(false)
		}else{
			return
		}
	}
	useEffect(()=>{
		document.addEventListener("mousedown",manageOutsideClick)

		return ()=>{
			document.removeEventListener("mousedown",manageOutsideClick)
		}
	},[])
	const manageOutsideClick1=(event)=>{
		if(!dialog1.current.contains(event.target)){
			setShowEmojipicker(false)
			}else{
			return
		}
	}
	useEffect(()=>{
		document.addEventListener("mousedown",manageOutsideClick1)

		return ()=>{
			document.removeEventListener("mousedown",manageOutsideClick1)
		}
	},[])
	useEffect(()=>{
	  async function getUsersData(){
		if(currentChat === undefined){return}else{
	  const UserId = currentChat.members.find((id)=>id !== currentUserId)
	  const getUserData = await axios.post(getUSer,{
		  id:UserId,
	  })
	  setUserData(getUserData.data);
	  }
	}
	  getUsersData();
  },[currentUserId,currentChat]) 
	const [messages,setMessages] = useState([])
		const setval = (e) => {
		e.preventDefault();
		if(currentChat){
		setValue(e.target.value)
		}else{
			console.log("chat")
		}
	}
	const handleEmojiPicker = ()=>{
		setShowEmojipicker(!showEmojipicker);
	}
	const handleEmojiclick = (emojiObject)=>{
		let message = value
		message += emojiObject.emoji;
		setValue(message);
	}
	const handleSubmit = async(e)=>{
		e.preventDefault();
		socket.current.emit("send-message",{
			from:currentUserId,
			to:userData._id,
			messages:value,
		})
		try{
	    const data = await axios.post(Messageadd,{
		    senderId:currentUserId,
			reciverId:userData._id,
			senderavatarImage:currentuser.useremail.avatarImage,
			reciveravatarImage:userSelected.avatarImage,
			text:value,
		})
	}catch(err){
		console.log(err)
	}
				setValue("");
				const msgs= [...messages];
				msgs.push({senderId:true,text:value,senderavatarImage:currentuser.useremail.avatarImage,reciveravatarImage:userData.avatarImage,createdAt:Date.now()})
				setMessages(msgs)

}
	useEffect(()=>{
		async function getMessage(){
	    try{
		if(currentChat === undefined){
			return
		}else{const data = await axios.post(Messageget,{
			senderId: currentUserId,
			reciverId:userData._id,
		})
		setMessages(data.data);
	}
		}catch(err){
			console.log(err)
		}
	}
          getMessage();
	},[userData])
	useEffect(()=>{
		if(socket.current){
			socket.current.on("receive-message",(data)=>{
				setArrivalMessage({senderId:false,text:data,senderavatarImage:currentuser.useremail.avatarImage,reciveravatarImage:userData.avatarImage,createdAt:Date.now()});
			})
		}
	},[socket, userData.avatarImage])
	useEffect(()=>{
		arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
	},[arrivalMessage])

	const logout = ()=>{
		socket.current.emit("logout")
		localStorage.clear();
		navigate('/');
		}
	const profile = ()=>{
		navigate('/profile');
	}
  return (
    <><Container>
        <div className="card-header ch">
        {currentChat === undefined || deleteChat === true ?(
            <Chatheaderblank/>
        ):(
            <Chatheader currentChat={currentChat} currentUserId={currentUserId}/>
        )
        
    }
            <span id="action_menu_btn" ><i onClick={()=>setShowMenu(!showMenu)} className="fas fa-ellipsis-v"></i></span>
				<div className={showMenu ? "menu" : "menu_hide"} ref={dialog}  ><ul>
				<li onClick={()=>profile()}><i className="fas fa-user-circle"></i>Profile</li>
				<li onClick={()=>logout()}><i className="fas fa-sign-out-alt"></i>LogOut</li>
				</ul></div>
        </div>
        <div className="card-body contacts_body1" id="cbid">
        {currentChat === undefined || deleteChat === true ? (
            <Welcome currentuser={currentuser}/>
          ) : (
            <Msgbox  userData={userData} messages={messages} currentuser={currentuser}/>
          )}
        </div>
        <div className="card-footer cf">
		<form className="searchbox2" onSubmit={(event) => handleSubmit(event)} id="chatform">            
			<div className="button-container">
				<div className="emoji" ref={dialog1}>
			<BsEmojiSmileFill onClick={handleEmojiPicker}/>
			{showEmojipicker && <Picker height={365} width={288} onEmojiClick={handleEmojiclick}/>}
				</div>
			</div>
           
                <input type="text"  value={value} onChange={(e)=> setval(e)} id="msg" placeholder="Type your message..." name="search" className="search1" />
            <div className="input-group-append">
                <button className="input-group-text send_btn" id="user-send"><i className="fas fa-location-arrow"></i></button>
            </div>
        </form>
        </div>
        </Container></>
  )
}
const Container = styled.div`
.searchbox2{
	display: flex;
}
.button-container{
	background-color: rgba(0, 0, 0, 0.4) !important;
	border-radius: 15px 0 0 15px !important;
	.emoji{
		margin-top:13px;
		margin-left:9px;
		position:relative;
		color:antiquewhite;
		cursor: pointer;
	
	    .EmojiPickerReact{
		  position: absolute;
		  top: -394px;
		  background-color: rgba(255,255,255,.6);
		  box-shadow: 0 5px 15px rgba(0,0,0,.3);
		  border-top: 1px solid rgba(255,255,255,.3);
		  border-left: 1px solid rgba(255,255,255,.3);
		  backdrop-filter: blur(10px);
		  border-radius: 15px !important;
	    }
		.emoji-categories{
			button{
				backdrop-filter: blur(5px);
				background-color: rgba(255,255,255,.6);		}
		}
		.EmojiPickerReact .epr-search-container input.epr-search{
			background: rgb(212 230 242);
			border: 3px solid rgb(179 193 239);		
		}
    }
	.EmojiPickerReact .epr-search-container input.epr-search:focus{
		border:3px solid rgb(123 201 237)	
	}
	.EmojiPickerReact li.epr-emoji-category>.epr-emoji-category-label{
		backdrop-filter: blur(5px);
		background-color: rgb(179 217 220 / 87%);
	}
   }
}
.search1{
	
	background-color: rgba(0, 0, 0, 0.4) !important;
	color:antiquewhite;
	border: 2px solid transparent;
	width: 100%;
	height: 7vh;
	padding: 0px 5px;
}
.search1:focus{
	outline: none;
}
.send_btn{
	background-color: rgba(0, 0, 0, 0.4) !important;
	color:antiquewhite;
	border: 0;
	cursor: pointer;
	border-radius: 0 15px 15px 0;
}
#action_menu_btn{
	color: antiquewhite;
	font-size: 25px;
	margin: 7px 0px;
	position:absolute;
	top:16px;
	right:21px;
	cursor: pointer;
}
.menu{
    position:absolute;
	z-index:1;
	padding:15px 0;
	border-radius:15px;
	top:69px;
	right:22px;
	color: antiquewhite;
    font-size: 19px;
	background-color: rgba(0, 0, 0, 0.3);
	box-shadow: 0 5px 15px rgba(0,0,0,.3);
	border-top: 1px solid rgba(255,255,255,.3);
	border-left: 1px solid rgba(255,255,255,.3);
	backdrop-filter: blur(10px);
	visibility: visible;
}
.menu_hide{
	visibility: hidden;
}
.menu ul{
	list-style:none;
	padding:0;
	margin:0;
}
.menu ul li{
	width:100%;
	padding:5px 15px;
	margin-bottom:5px;
}
.menu ul li i{
	padding-right:10px
} 
.menu ul li:hover {
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.2);
}
.ch{
	display: flex;
	height: 12vh;
}
.innerheader{
	width: 47vw;
}
.active{
	display: flex;
}
.img-cont{
	width: 6vw;
	height: 10vh;
	/* border: 2px solid black; */
}
.userinfo span{
	color: antiquewhite;
	font-size: 24px;
}
.userinfo p{
	color: antiquewhite;
	font-size: 13px;
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
}
.msg-container{
	margin-top: auto;
	margin-bottom: auto;
	color: antiquewhite;
	position: relative;
	/* border: 2px solid black; */
	padding: 10px;
	border-radius: 22px;
}
.msg-time{
	position: absolute;
	left: 0;
	bottom: -22px;
	font-size: 13px;
}
.outgoing{
	margin-left: 10px;
	box-shadow: 0 5px 15px rgba(0,0,0,.3);
	border-top: 1px solid rgba(255,255,255,.3);
	border-left: 1px solid rgba(255,255,255,.3);
	backdrop-filter: blur(10px);
	background-color: #82ccdd8f;
}
.incoming{
	margin-left: 10px;
	box-shadow: 0 5px 15px rgba(0,0,0,.3);
	border-top: 1px solid rgba(255,255,255,.3);
	border-left: 1px solid rgba(255,255,255,.3);
	backdrop-filter: blur(10px);
	background-color:  #78e08fad;
}
.card-header{
	height: 9vh;
	background-color: rgba(0, 0, 0, 0.2) !important;
	/* border: 2px solid black; */
	border-radius: 15px 15px 0 0 !important;
}
.card-body{
	height: 70vh;
	background-color: rgba(0, 0, 0, -0.9) !important;
	/* border: 2px solid black; */
	overflow-y: auto;
}
.card-footer{
	height: 4vh;
	background-color: rgba(0, 0, 0, 0.3) !important;
	/* border: 2px solid black; */
	border-radius: 0 0 15px 15px !important;
}
.cf{
	height: 10vh;
}
.contacts_body1{
	height: 65vh;
}
/* .searchbox{
} */
.searchbox{
	display: flex;
}
`;