import React, {useState} from 'react'
import styled from 'styled-components'

function Register() {

    const [ID, setID] = useState("")
    const [PW, setPW] = useState("")
    const [confirmPW, setConfirmPW] = useState("")
    const [nickname, setNickname] = useState("")

  return (
    <RegisterContainer>
        <img src = "img/tikkle_logo.png" style={{width: '333px', height: '129.59px', marginTop: '180px'}}/>
        <div style={{marginTop: '127px'}}>
            <LoginInput placeholder='ID' onChange={e=>{setID(e.target.value)}}/>
            <br/>
            <LoginInput style={{marginTop: '38px'}} placeholder='PW' type="password" onChange={e=>{setPW(e.target.value)}}/>
            <br/>
            <LoginInput style={{marginTop: '38px'}} placeholder='PW 확인' type="password" onChange={e=>{setConfirmPW(e.target.value)}}/>
            <br/>
            <LoginInput style={{marginTop: '38px'}} placeholder='닉네임' onChange={e=>{setNickname(e.target.value)}}/>
        </div>
        <LoginBtn style={{marginTop: '98px'}}>회원가입</LoginBtn>
    </RegisterContainer>
  )
}

let RegisterContainer = styled.div`
    width: 100vw;
    height: 1124px;
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

export default Register