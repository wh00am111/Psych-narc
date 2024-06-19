import React, { useState, useContext, useEffect } from 'react';
import { Context } from '..';
import { Pagination, Card, CardGroup, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../styles/utility-styles.css';
import '../styles/text-styles.css'
import '../styles/media.css'
import { observer } from 'mobx-react-lite';
import { fetchMassMedia } from '../http/massmediaAPI';

const MassMedia = observer(() => {
    const { massmedia } = useContext(Context);

  useEffect(() => {
    fetchMassMedia().then(data => {
      massmedia.setMassMedia(data);
      massmedia.setTotalCount(data);
    });
  }, [massmedia]);

    return(
        <div>
        <Container className="mt-5" style={{width:'80vw'}}>
        {massmedia.massMedia.map((massmediaItem, index) => (
                <Row key = {index} xs={1} className='mt-5'>
                    <Col className="col-md-5 col-lg-5">
                        <Card style={{border:'none', height:'100%'}}>
                        <Card.Img 
                            variant="top" 
                            src={process.env.REACT_APP_API_URL + massmediaItem.image} 
                            style={{maxWidth:'100%', height:'100%'}} 
                            alt='Публикация'/>
                        <div className="image-Deco">
                            <div className="flex-wrap block-Standart">
                                    <div className="gradient mb-3" style={{height:'9px', width:'50%'}}/>
                                </div>
                            </div>
                            </Card>
                    </Col>
                    <Col className="block-Standart col-md-1 col-lg-1" style={{maxWidth:'50px'}}>
                        <div className="lineDiv-2"/>
                    </Col>
                    <Col className="col-md-6 col-lg-6" style={{display:'flex', flexDirection:'column', position:'relative'}}>
                        <div className="title-Text-2" style={{textAlign:'left', color:'#3D9378'}}>
                            {massmediaItem.name}
                        </div>
                        <div className="body-Regular mt-4" style={{color:'#3D9378'}}>
                            {massmediaItem.text}
                        </div>
                        <div style={{justifyContent:'space-between', display:'flex', marginTop:'auto'}}>
                            <div className="body-Regular mt-4" style={{color:'#4BB594'}}>
                                {massmediaItem.date}
                            </div>
                            <div className='mt-auto'>
                                <Button className='button-3' style={{border:'none'}}>
                                    Подробнее
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
        ))}
            </Container>
        
        </div>
    );
})

export default MassMedia;