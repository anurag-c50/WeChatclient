import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { getUSer } from '../apiRouter';

export default function Chatheader({currentChat,currentUserId}) {
  const [userData,setUserData] = useState([]);
  useEffect(()=>{
    async function getUsersData(){
      try{
    const UserId = currentChat.members.find((id)=>id !== currentUserId)
    const getUserData = await axios.post(getUSer,{
        id:UserId,
    })
    setUserData(getUserData.data);
    }
  catch(err){
    console.log(err)
  }
}
    getUsersData();
},[currentUserId,currentChat]) 
  return (
       <div className="innerheader">
                <div className="active">
                <div className="img-contmain">   
                <img src={`data:image/svg+xml;base64,${userData.avatarImage}`}alt="avatar" />
                </div> 
                <div className="userinfomain">
                    <span className="usernamemain">{userData.username}</span>
                </div>
                </div>
            </div>
  )
}
