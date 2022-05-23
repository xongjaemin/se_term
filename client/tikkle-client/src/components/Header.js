import React from 'react'
import styled from 'styled-components'

function Header() {
  return (
    <div style={{width: '100vw', height:'80px', position: 'fixed', background: 'white', overflowX:'hidden'}}>
        <HeaderContainer>
          <img src="img/tikkle_logo.png" style={{width: '87px', height: '32px'}}/>
          <MenuContainer>
            <div>홈</div>
            <div>서비스</div>
          </MenuContainer>
          <img src='img/hamburger_icon.png' style={{width: '33px', height: '33px'}}/>
        </HeaderContainer>
    </div>
  )
}

let HeaderContainer = styled.div`
  position: fixed;
  width: 78vw;
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: 11vw;
  margin-right: 11vw;
  justify-content: space-between;
  font-family: 'Noto Sans KR', sans-serif;
  background: white;
`;
let MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 226px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
`;

export default Header