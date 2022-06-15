import React, {useEffect} from 'react'
import Header from '../../components/Header'
import styled, {keyframes} from 'styled-components'
import { useSelector } from 'react-redux'
import UserMenu from '../../components/UserMenu'
import {Link} from 'react-router-dom'

function Landing() {
  let reduxStore = useSelector((state)=>{return state})

  useEffect(() => {
    console.log(reduxStore.isLoggedIn)
  })
  

  return (
    <div>
      
      <Header/>
      {
          reduxStore.showUserMenu
          ? (
            <UserMenuFadeIn>
              <UserMenu/>
            </UserMenuFadeIn>
          )
          : null
        }
      <LandingContainer style={{overflowY: 'hidden'}}>
        <MoneyImage src="img/money_3d.png" />
        
        <LandingTexts>
          <div style={{fontStyle: 'normal', fontWeight: '700', fontSize: '48px', marginBottom: '14px'}}>
            클릭 한 번으로<br/>
            네이버 포인트 모으자!
          </div>
          <div style={{fontStyle: 'normal', fontWeight: '400', fontSize: '24px'}}>
            전국민 티끌 모아 태산 프로젝트 💸
          </div>
          <div style={{fontStyle: 'normal', fontWeight: '400', fontSize: '24px', color: '#1CC45E'}}>
            티끌 플러스
          </div>
          <Link to={reduxStore.isLoggedIn ? '/service_list' : '/login'}>
            <ServiceBtn>서비스 바로가기</ServiceBtn>
          </Link>
        </LandingTexts>

        

      </LandingContainer>
      
    </div>
  )
}

const FadeInUp = keyframes`
  0%{
    opacity: 0;
    transform: translate3d(0,100%,0);
  }
  to{
    opacity: 1;
    transform: translateZ(0);
  }
`;

const FadeInFromRight = keyframes`
  0%{
    opacity: 0;
    transform: translate3d(100%,0,0);
  }
  to{
    opacity: 1;
    transform: translateZ(0);
  }
`;


let LandingContainer = styled.div`
  width: 100vw;
  height: 800px;
  padding-top: 100px;
  background: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:
`;

let MoneyImage = styled.img`
  width: 600px;
  height: 450px;
  margin-right: 57px;
  animation: ${FadeInUp} 1s;
`;

let LandingTexts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 57px;
`;

let ServiceBtn = styled.div`
  width: 320px;
  height: 86px;
  line-height: 86px;
  background: #1CC35E;
  border-radius: 10px;
  color: white;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  margin-top: 31px;
`;


let UserMenuFadeIn = styled.div`
  animation: ${FadeInFromRight} 0.8s;
`;


export default Landing