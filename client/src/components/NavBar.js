import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from "react-router-dom";
import Emblem from '../assets/Emblem.png';
import Logo from '../assets/Logo.png';
import search from '../assets/search.svg';
import PersAcc from '../assets/PersAcc.svg';
import Eye from '../assets/Eye.svg';
import Localization from '../assets/localization.png';
import '../styles/gradient.css';
import '../styles/images-styles.css';
import { MAINPAGE_ROUTE, LOGIN_ROUTE, APPEALS_ROUTE, CONTACTS_ROUTE, PERSONALACCOUNT_ROUTE, SERVICES_ROUTE, STRUCTURE_ROUTE, TEAMNEWS_ROUTE, VACANCIES_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";






const NavBar= observer(() => {
  const {user} = useContext(Context)
  const [isExpanded, setIsExpanded] = useState(false);
  
  const logOut = () => {
    localStorage.removeItem('token')
    user.setUser({})
    user.setIsAuth(false)
  }

    return (
      <Navbar className="gradient-NavBar" style={{height:'76px', width:"100vw"}}>
        <Container fluid>
          <Navbar.Brand>
            <img src={Emblem} alt="Национальная эмблема" style={{ marginLeft: '20px'}}/>
            <img src={Logo} alt="Логотип" style={{paddingLeft: '20px'}}/>
          </Navbar.Brand>
          <div className="lineDiv" style={{marginLeft: '10px'}}/>
          <NavLink to={MAINPAGE_ROUTE} className="body-Bold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', paddingLeft: '24px', textDecoration: 'none'})}>Главная</NavLink>
          <NavLink to={STRUCTURE_ROUTE} className="body-Semibold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', marginLeft: '34px', textDecoration: 'none'})}>Структура</NavLink>
          <NavLink to={TEAMNEWS_ROUTE} className="body-Semibold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', marginLeft: '34px', textDecoration: 'none'})}>Новости коллектива</NavLink>
          <NavLink to={VACANCIES_ROUTE} className="body-Semibold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', marginLeft: '34px', textDecoration: 'none'})}>Вакансии</NavLink>
          <NavLink to={SERVICES_ROUTE} className="body-Semibold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', marginLeft: '34px', textDecoration: 'none'})}>Услуги</NavLink>
          <NavLink to={APPEALS_ROUTE} className="body-Semibold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', marginLeft: '34px', textDecoration: 'none'})}>Обращения граждан</NavLink>
          <NavLink to={CONTACTS_ROUTE} className="body-Semibold" style={({isActive}) => ({color: isActive ? '#00FFAF' : 'white', marginLeft: '34px', textDecoration: 'none'})}>Контакты</NavLink>
          <div className="lineDiv" style={{marginLeft: '15px'}}></div>
          <Nav>
            <img src={search} alt="Поиск" style={{cursor: 'pointer', marginLeft:'15px'}}/>
            <img src={Eye} alt="Режим для слабовидящих" style={{cursor: 'pointer', marginLeft:'40px'}}/>
            <img src={Localization} alt="Язык" style={{cursor: 'pointer', marginLeft:'40px', maxHeight:'35px'}}/>
            <NavDropdown id="dropdown" className="custom-dropdown" style={{width:'26px', height:'26px', marginBottom:'7px'}}/>
            {user.isAuth ?
           <Nav> 
             <NavLink to={LOGIN_ROUTE}>
              <img src={PersAcc} alt="Аккаунт" style={{marginLeft:'20px'}}/>
            </NavLink>
            <NavDropdown className='custom-dropdown' style={{width:'36px', height:'26px', marginBottom:'7px'}}>

              <NavDropdown.Item 
                onClick={() => logOut()} 
                eventKey="1"
                drop='start'
                style={{marginRight:'30px'}}
                >
                  Выйти
                
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
            :
            <NavLink to={LOGIN_ROUTE}>
              <img src={PersAcc} alt="Аккаунт" style={{cursor: 'pointer', marginLeft:'20px', paddingRight:'20px'}}/>
            </NavLink>
            }
          </Nav>
        </Container>
      </Navbar>
    );
});

export default NavBar;