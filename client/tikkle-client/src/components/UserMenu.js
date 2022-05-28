import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setIsLoggedIn, setShowUserMenu, setUserName} from '../store/store';
import {Link, useNavigate} from 'react-router-dom';

function UserMenu() {

let reduxStore = useSelector((state)=>{return state})
let dispatch = useDispatch()
let navigate = useNavigate()

const logoutBtnClickListener = () => {
  dispatch(setIsLoggedIn())
  dispatch(setUserName({name: ""}))
  navigate("/")
}

  return (
    <div style={{width: '30vw', height:'100vh', position: 'fixed', background: 'white', borderLeft: '1px solid #1CC45E', marginLeft: '70vw'}}>
        <img src='img/x_icon.png' style={{width: '24px', height: '24px', marginLeft: '19px', marginTop: '32px'}} onClick={()=>{
            dispatch(setShowUserMenu())
        }}/>

        {
          reduxStore.isLoggedIn
          ?(
            <div style={{marginLeft: '43px'}}>
              <div style={{fontWeight: '700', fontSize: '24px', marginTop: '76px'}}>
                <span>{reduxStore.userName}님! </span>
                <span style={{fontWeight: '400'}}>반가워요 👋</span>
              </div>
              <div style={{fontWeight: '400', fontSize: '24px', marginTop: '27px'}}>
                티끌플러스로 지금까지<br/> <span style={{color: '#1CC45E'}}>1350원💸</span>을 모았어요
              </div>
              <div style={{marginTop: '40px'}} onClick={logoutBtnClickListener}>
                <img src='img/logout_icon.png' style={{width: '24px', height: '24px'}}/>
                <span style={{fontSize:'24px', marginLeft: '5px'}}>로그아웃</span>
              </div>
            </div>
          )
          :(
          <div>
            <Link to='/register' onClick={()=>{dispatch(setShowUserMenu())}} style={{textDecoration: 'none'}}>
            <div style={{marginTop: '65px', marginLeft: '43px', fontWeight: '400', fontSize: '23px', color: 'black'}}>10초만에 간편 <span style={{color: '#1CC45E'}}>회원가입</span></div>
            </Link>
            <div style={{marginTop: '64px', marginLeft: '43px', fontWeight: '400', fontSize: '23px', color:'#9D9D9D'}}>이미 계정이 있다면..</div>

            <Link to='/login' onClick={()=>{dispatch(setShowUserMenu())}}>
              <div style={{marginLeft: '43px', fontWeight: '400', fontSize: '23px', color:'#1CC45E', width: '200px'}}>로그인하기</div>
            </Link>
          </div>
          )
        }
    </div>
  )
}

export default UserMenu