import React from 'react'
import styled from 'styled-components'

export default function Conversations({userData}) {
  return (
    <><Container>
        <div className="avatar">
                    <div className="img-cont">
                    <img src={`data:image/svg+xml;base64,${userData.avatarImage}`} 
                     alt="" /> 
                    </div>
                    <div className="userinfo">
                        <span className="username">{userData.username}</span>
                        <p className="status"></p>
                    </div>
                </div>
</Container></>
  )
}
const Container = styled.div``;