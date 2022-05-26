import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import {setShowUserMenu} from '../store/store';
import {Link} from 'react-router-dom';

function Header() {

  let reduxStore = useSelector((state)=>{return state})
  let dispatch = useDispatch()

  return (
    <div style={{width: '100vw', height:'80px', position: 'fixed', background: 'white', overflowX:'hidden'}}>
        <HeaderContainer>
          <img src="img/tikkle_logo.png" style={{width: '87px', height: '32px'}}/>
          <MenuContainer>
            
            <Link to='/'>
              <div style={{color: 'black'}}>홈</div>
            </Link>
            <Link to='/service_list'>
              <div style={{color: 'black'}}>서비스</div>
            </Link>
          </MenuContainer>
          <img src='img/user_icon.png' style={{width: '33px', height: '33px'}} onClick={()=>{
            dispatch(setShowUserMenu())
          }}/>
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