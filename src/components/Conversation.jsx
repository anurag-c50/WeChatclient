import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { getUSer } from '../apiRouter';
import { useState } from 'react'
import styled from 'styled-components'
export default function Conversation({online,data,currentUserId}) { 
        const [userData,setUserData] = useState([]);

    useEffect(()=>{
        async function getUsersData(){
        try{        
            const UserId = data.members.find((id)=>id !== currentUserId)
             const getUserData = await axios.post(getUSer,{
                    id:UserId,
            })
            setUserData(getUserData.data);
            }catch(err){
                console.log(err)
            }}
        getUsersData();
    },[currentUserId]) 
  return (
 <>
 <Container>
    <div className="avatar">
                    <div className="img-cont">
                    <img src={`data:image/svg+xml;base64,${userData.avatarImage}`} 
                     alt="" /> 
                    </div>
                    <div className="userinfo">
                        <span className="username">{userData.username}</span>
                        <p className="status">{online ? "Online" : "Offline" }</p>
                    </div>
                </div>
 </Container></>
  )
}
const Container = styled.div``;