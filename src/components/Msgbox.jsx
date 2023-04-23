import React,{useEffect,useRef} from 'react'
import styled from 'styled-components'
export default function Msgbox({userData,messages,currentuser}) {
  const scrollRef = useRef();
  const formatDate = (date)=>{
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
  }
  useEffect(()=>{
   scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  return (
  <>
  <Container>{ 
Object.entries(messages).map((message,index)=>{

return(
     <div ref={scrollRef} className="only" key={index}>
            <div className= {`d-flex justify-content-${message[1].senderId ? "end" : "start"} mb-4`}>
                <div className="img-cont-msg">
                    <img src={`data:image/svg+xml;base64,${message[1].senderId ? currentuser.useremail.avatarImage : userData.avatarImage}`} alt=''/>
                </div>
                <div  className={`msg-container ${message[1].senderId ? "incoming" : "outgoing"}`}> {message[1].text}
                    <span className="msg-time">{formatDate(message[1].createdAt)}</span>
                </div>
             </div>
       </div>

)})}
     </Container></>
  )
}
const Container = styled.div``;