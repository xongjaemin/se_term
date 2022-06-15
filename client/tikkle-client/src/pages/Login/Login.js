import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setUserName } from '../../store/store'

//login page

function Login() {

    let reduxStore = useSelector((state)=>{return state})
    let dispatch = useDispatch()
    
    const navigate = useNavigate();

    const [ID, setID] = useState("")
    const [PW, setPW] = useState("")

    const [wrongPW, setWrongPW] = useState(false)

    //when login btn is clicked
    const loginOnclickListener = async() => {

    const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/login',
        data: {
          id: ID,
          pw: PW
        }
      });

    if(response.data.success === 1){
        setWrongPW(false)
        dispatch(setIsLoggedIn())
        dispatch(setUserName({name: response.data.userName}))
        navigate("/")
    } else{
        setWrongPW(true)
    }
}

  return (
    <LoginContainer>
        <img src = "img/tikkle_logo.png" style={{width: '333px', height: '129.59px', marginTop: '180px'}}/>
        <div style={{marginTop: '127px'}}>
            <LoginInput placeholder='ID' onChange={e=>{setID(e.target.value)}}/>
            <br/>
            <LoginInput style={{marginTop: '38px'}} placeholder='PW' type="password" onChange={e=>{setPW(e.target.value)}}/>
        </div>
        {
            wrongPW === true
            ?(<div style={{color: 'red', fontSize: '24px'}}>
                ID/비밀번호를 확인해주세요
            </div>)
            :null
        }
        <LoginBtn style={{marginTop: '98px'}} onClick={loginOnclickListener}>로그인</LoginBtn>
    </LoginContainer>
  )
}

let LoginContainer = styled.div`
    width: 100vw;
    height: 924px;
    display: flex;
    align-items: center;

    background: #FAFAFA;
    flex-direction: column;
`;

let LoginInput = styled.input`
    width: 520px;
    height: 49px;
    border: 1px solid #1CC45E;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-left: 26px;
    font-size: 24px;
`;

let LoginBtn = styled.div`
    width: 238px;
    height: 74px;
    background: #1CC35E;
    border-radius: 10px;
    color: white;
    font-weight: 700;
    font-size: 24px;
    line-height: 74px;
    text-align: center;
`;

export default Login