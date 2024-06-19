import React, { useState } from 'react';
import { Pagination, Card, Container } from 'react-bootstrap';
import OtherServ from '../assets/OtherServ.png'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../styles/utility-styles.css';
import '../styles/text-styles.css'

let active = 1
const itemsPerPage = 8; // Количество карточек на странице
const totalItems = 40; // Общее количество карточек

function OtherServices() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Функция для генерации массива карточек на основе текущей страницы
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Array.from({ length: totalItems }, (_, index) => index).slice(startIndex, endIndex);
  };

  // Функция для обработки изменения страницы
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Функция для генерации элементов пагинации
  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 5px',
          backgroundColor: active === number ? 'blue' : 'lightgray',
          color: 'white',
        }} key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div>
    <Container className='block-Standart mt-3' style={{overflowX:'hidden'}}>
      <Row  xs ={2} md={4} lg={4} сlassName="mt-5 justify-content-center">
        {getCurrentPageItems().map((itemIndex) => (
          <Col key={itemIndex} className='g-3'>
            <Card className='card-Administration' style={{border:'none'}}>
              <Card.Img variant="top" src={OtherServ} style={{height:'100%', maxWidth:'100%', marginBottom:'-7px'}} />
              <Card.Body>
                <Card.Title className='body-Semibold' style={{color:'white',  marginBottom:'4px', textAlign:'center'}}> Услуга {itemIndex + 1}</Card.Title>
                <div className='div-Card-Administration block-Standart'/>
                <Card.Text className='body-Smallest-Text mt-2' style={{color:'white'}}>
                    Lorem ipsum dolor sit amet consectetur.
                    In nunc mi ultricies vestibulum varius.
                    In id duis elit aliquet dolor scelerisque urna sit posuere.            
                </Card.Text>
                <div style={{display:'flex'}}>
                    <Button className='button-2 ms-auto' style={{border:'none'}}>
                        Подробнее
                    </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
      <Pagination className='block-Standart mt-2'>
        <Pagination.Prev style={{transform:'translateX(-590px) translateY(-390px)'}} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            <div className='block-Standart mt-4'>
            {renderPaginationItems()}
            </div>
        <Pagination.Next style={{transform:'translateX(590px) translateY(-390px)'}} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
}

export default OtherServices;