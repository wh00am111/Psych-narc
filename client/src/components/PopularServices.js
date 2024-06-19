import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { fetchServices } from '../http/servicesAPI';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const PopularServices = observer(() => {
  const { services } = useContext(Context)
  const pages = []

  useEffect(() => {
    fetchServices(services.page, services.limit).then(data => {
      services.setServ(data.rows);
      services.setTotalCount(data.count);
    });
  }, [services.page, services.limit]);

  const totalPages = Math.ceil(services.totalCount / services.limit);

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1)
  }


  const handlePageChange = (pageNumber) => {
    services.setPage(pageNumber);
  };

  return (
    <div>
      <Container className='block-Standart'>
        <Pagination className='mt-5' style={{marginRight:'20px'}}>
          <Pagination.Prev  
            disabled={services.page === 1} 
            onClick={() => handlePageChange(services.page - 1)} />
          </Pagination>
        <Row xs={1} className="mt-5">
          {services.serv.map((servicesItem, index) => (
             <Col key={index} className='col-md-4 col-lg-4 g-5'>
             <Card className='card-Popular-Services' style={{border:'none'}}>
               <Card.Img 
                variant="top" 
                className='card-img-popServ-top' 
                src={process.env.REACT_APP_API_URL + servicesItem.image} 
                style={{marginBottom:'-10px', maxWidth:'100%'}}
                />
               <Card.Body style={{display:'flex', flexDirection:'column'}} >
                  <Card.Title 
                    className='caption mb-3 mt-3' 
                    style={{textAlign:'center', marginBottom:'4px'}}>
                     {servicesItem.name}
                  </Card.Title>
                     <div className='div-Card-2' style={{display:'flex', justifyContent: 'center'}}/>
                  <Card.Text 
                    className='body-Regular mt-3' 
                    style={{color:'white'}}>
                     {servicesItem.text}                   
                  </Card.Text>
                     <Button className='button-2 ms-auto' style={{border:'none', display:'flex', marginTop:'auto'}}>
                         Подробнее
                     </Button>
               </Card.Body>
             </Card>
           </Col>
          ))}
        </Row>
        <Pagination className='mt-5' style={{marginLeft:'20px'}}>
         <Pagination.Next 
            disabled={services.page === totalPages} 
            onClick={() => handlePageChange(services.page + 1)} />
        </Pagination>
      </Container>
      <Pagination className='mt-5'>
          <div className='block-Standart' style={{marginLeft:'46.5%'}}>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={services.page === page}
                    onClick={() => services.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
             </div>
        <div className='ms-auto' style={{marginRight:'8vw'}}>
          <Button className='button-3' style={{ border: 'none' }}>
            Больше услуг
          </Button>
        </div>
      </Pagination>
    </div>
  );
});

export default PopularServices;