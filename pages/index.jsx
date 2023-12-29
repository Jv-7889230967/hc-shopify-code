"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import StyledComponentsRegistry from './registry';
import Image from 'next/image';
import { LiaUserCircle } from 'react-icons/lia';
import { TbLogout2 } from 'react-icons/tb';
import { userService } from 'services';

export default function Home() {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <StyledComponentsRegistry>
      <Container>
        <div className='parent-div'>
          <nav>
            <Image
              src='https://imgs.search.brave.com/LgvtwAFO0c3nPnkX-sjrI3jZaTMIn1-wEqcGhrx0Fy8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGl0ZWNodHVyZS5h/Z2VuY3kvYnJhbmQt/bG9nb3Mvd3AtY29u/dGVudC91cGxvYWRz/L3dwZG0tY2FjaGUv/SGFycGVyQ29sbGlu/cy1QdWJsaXNoZXJz/LTkwMHgwLnBuZw'
              alt='logo'
              width={250}
              height={200}
              className='logo'
            />
            <ul>
              <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/'}>Admin</Link></li>
              <li><Link href={'/'}>SysAdmin</Link></li>
              <li><Link href={'/'}>About</Link></li>
            </ul>
            <LiaUserCircle className='user-icon' size={42} onClick={toggleMenu} />
            <div className={`sub-menu-wrap ${isSubMenuOpen ? 'open-menu' : ''}`}>
              <div className='sub-menu'>
                <div className='user-info'>
                  <TbLogout2 size={23} className='logout-icon' onClick={userService.logout}/>
                  <h5>Logout</h5>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </StyledComponentsRegistry>
  );
}

const Container = styled.div`
.parent-div{
  width:100vw;
  height:100vh;
  background: #F0FFF8;
}  
nav{
    background:#D4F7FF;
    width:100vw;
    height:65px;
    padding:10px 10%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    position:relative;
  }
  .logo{
    margin-left:-7rem;
  }
  .user-icon{
    cursor:pointer;
    margin-left:10px;
    margin-top:-9px
  }
  nav ul{
    width:100%;
    text-align:right;
  }
  nav ul li{
    display:inline-block;
    list-style:none;
    margin:10px 20px;
  }
  nav ul li a{
    text-decoration:none;
    color: black;
    font-size: 16px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  .sub-menu-wrap
  {
    border-radius:20px;
    position:absolute;
    top:100%;
    right:3%;
    width:155px;
    max-height:0px;
    overflow:hidden;
    transition: max-height 0.5s ease-in-out;
  }
  .sub-menu-wrap.open-menu
  {
    max-height:200px;
  }
  .sub-menu{
    background:#fff;
    padding:20px;
    margin:10px;
  }
  .user-info{
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .user-info h5{
    font-weight:500;
margin-left:6px;
  }
  .logout-icon
  {
    cursor:pointer;
    transition:0.2s ease-in-out;
  }
  .logout-icon:hover {
    transform: scale(1.1);
  }


`;
