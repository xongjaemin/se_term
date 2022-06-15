import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../../components/Header'
import styled, {keyframes} from 'styled-components'
import { useSelector } from 'react-redux'
import UserMenu from '../../components/UserMenu'
import {Link} from 'react-router-dom'

//service page

function ServiceList() {

  const [hrefList, setHrefList] = useState([])

  const sendRequest = async() => {
    const response = await axios.get('http://localhost:8080/links');
    setHrefList(response.data);

  }

  useEffect(()=>{
    sendRequest();
  })

    let reduxStore = useSelector((state)=>{return state})
    
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
        <ServiceContainer>
            <div style={{width: '156px', display: 'flex', justifyContent:'space-between', marginLeft: '60%', marginBottom: '35px'}}>
                <div style={{fontSize: "20px", height:'26px', lineHeight:'26px'}}>정렬방식</div>
                <img src="img/two_box_icon.png" style={{width: '24px', height: '24px'}}/>
                <img src="img/list_icon_selected.png" style={{width: '24px', height: '24px'}}/>
            </div>

            {
                hrefList.map((list, index) => (
                    <div>
                        <div style={{marginLeft: '15px', fontWeight: '600', color:'#1CC45E', fontSize: '24px', marginBottom:'10px'}}>{list.title}</div>
                        <LinkBox>
                            {
                                list.links.map((linkList, idx)=>(
                                    <div>
                                        <a href={linkList} target="_blank" style={{color: 'black'}}>{linkList}</a>
                                    </div>
                                ))
                            }
                        </LinkBox>
                    </div>
                ))
            }
        </ServiceContainer>
    </div>
  )
}

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

let UserMenuFadeIn = styled.div`
  animation: ${FadeInFromRight} 0.8s;
`;

let ServiceContainer = styled.div`
  padding-top: 167px;
  width: 100vw;
  height: auto;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let LinkBox = styled.div`
  padding: 35px;
  width: 65vw;
  height: auto;
  border: 1px solid #1CC45E;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 30px;
font-size: 24px;
margin-bottom: 59px;
`;

export default ServiceList