import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setShowUserMenu} from '../store/store';
import {Link} from 'react-router-dom';

function UserMenu() {

let reduxStore = useSelector((state)=>{return state})
let dispatch = useDispatch()

  return (
    <div style={{width: '30vw', height:'100vh', position: 'fixed', background: 'white', borderLeft: '1px solid #1CC45E', marginLeft: '70vw'}}>
        <img src='img/x_icon.png' style={{width: '24px', height: '24px', marginLeft: '19px', marginTop: '32px'}} onClick={()=>{
            dispatch(setShowUserMenu())
        }}/>

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

export default UserMenu