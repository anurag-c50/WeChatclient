import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Robot from "./robot.gif"
export default function Welcome({currentuser}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  useEffect( ()=>{
    if(currentuser){
      setCurrentUserName(currentuser.useremail.username);
    }
  },[currentuser])
  return (
    <>
    <Container><div className='Welcome'>
        <img src={Robot} alt="" />
        <h1>
            Welcome, <span>{currentUserName}</span>
        </h1>
        <h3>Please select a chat to start Messaging</h3>
        </div>
        </Container></>
  )
}
const Container =styled.div`
.Welcome{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color:wheat;
text-align: center;
}
img{
  height:37vh;
}
span{
 color:#d9f5ff;
}`;