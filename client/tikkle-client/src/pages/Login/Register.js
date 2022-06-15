import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

//register page

function Register() {

    const navigate = useNavigate()

    const [ID, setID] = useState("")
    const [PW, setPW] = useState("")
    const [confirmPW, setConfirmPW] = useState("")
    const [nickname, setNickname] = useState("")
    const [checkPW, setCheckPW] = useState(true)

    const registerOnClickListener = async() => {

        
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/register',
            data:{
                id: ID,
                pw: PW,
                name: nickname
            }
        });

        if(response.data.success === 1){ //if login is succeeded, go ti main page
            navigate("/")
        }else{ //if login is failed
            alert("회원가입 실패")
        }
    }

    useEffect(() => {
      PW === confirmPW
      ? setCheckPW(true)
      : setCheckPW(false)
    }, [PW, confirmPW])
    

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
        {
            checkPW === true
            ? null
            :(<div style={{color: 'red', fontSize: '24px'}}>
            비밀번호가 일치하지 않습니다
        </div>)
        }
        <LoginBtn style={{marginTop: '98px'}} onClick={registerOnClickListener}>회원가입</LoginBtn>
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