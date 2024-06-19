import React from "react";
import '../styles/utility-styles.css'
import '../styles/text-styles.css'
import { Col, Container, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PersonalAccount = () => {
    return (
        <>
        <NavBar/>
       
                    <div className='block-Standart' style={{marginTop:'10%'}}>
                        <div className="display-1" style={{marginLeft:'5%'}}>
                        Личный кабинет
                        </div>
                        <div style={{marginLeft:'12%'}}>
                        <Button className='button-3 mt-2' style={{border:'none', minWidth:'15%', fontSize:'16px', minHeight:'47px', fontWeight:'700'}}>
                            Сохранить изменения
                        </Button>
                        </div>
                    </div>
                    <div className="body-Bold" style={{color:'#1F674F', marginLeft:'25.5%', marginTop:'70px'}}>
                        Информация
                    </div>
                    <Container style={{width:'62.5%'}}>
                        <Row className="mt-5">
                            <Col>
                                <Form style={{paddingLeft:'20%'}}>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label className="body-Regular" style={{color:'#3D9378'}}>Имя*</Form.Label>
                                        <Form.Control type="text" placeholder="Ваше имя" style={{height:'50px', width:'100%', borderRadius:'15px 15px 15px 15px', borderWidth:'3px'}} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label className="body-Regular" style={{color:'#3D9378'}}>Фамилия</Form.Label>
                                        <Form.Control type="text" placeholder="Ваша фамилия" style={{height:'50px', width:'100%', borderRadius:'15px 15px 15px 15px', borderWidth:'3px'}} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <Form style={{paddingLeft:'20%'}}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label className="body-Regular" style={{color:'#3D9378'}}>email*</Form.Label>
                                        <Form.Control type="text" placeholder="Ваш email" style={{height:'50px', width:'100%', borderRadius:'15px 15px 15px 15px', borderWidth:'3px'}} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label className="body-Regular" style={{color:'#3D9378'}}>Телефон</Form.Label>
                                        <Form.Control type="tel" placeholder="Ваш номер телефона" style={{height:'50px', width:'100%', borderRadius:'15px 15px 15px 15px', borderWidth:'3px'}} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    <div className='block-Standart' style={{marginTop:'50px', width:'55%', justifyContent:'space-between', marginLeft:'25%'}}>
                        <div className="caption" style={{color:'#3D9378'}}>
                            Пароль
                        </div>
                        <div style={{}}>
                        <Button className='button-3 mt-2' style={{border:'none', minWidth:'15%', fontSize:'16px', minHeight:'30px', fontWeight:'700'}}>
                            Обновить пароль
                        </Button>
                        </div>
                    </div>
                    <div className="body-Small-Text" style={{color:'#3D9378', marginLeft:'25%'}}>
                            Последнее обновление 1 месяц назад
                        </div>
        <Footer/>
        </>
    );
};

export default PersonalAccount;