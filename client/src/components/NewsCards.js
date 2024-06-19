import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { fetchNews } from '../http/newsAPI';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const NewsCards = observer(() => {
  const { news } = useContext(Context);

  useEffect(() => {
    fetchNews(news.page, news.limit).then(data => {
      news.setNovelty(data.rows);
      news.setTotalCount(data.count);
    });
  }, [news.page, news.limit]);

  const totalPages = Math.ceil(news.totalCount / news.limit);

  const handlePageChange = (pageNumber) => {
    news.setPage(pageNumber);
  };

  return (
    <div>
      <Container className='block-Standart'>
        <Row xs={1} className="mt-5">
          {news.novelty.map((newsItem, index) => (
            <Col key={index} className='col-md-4 col-lg-4 g-5'>
              <Card className='card-News' style={{ backgroundColor: '#F4F5F6', border: 'none', position:'relative' }}>
                <Card.Img 
                  variant="top" 
                  className='card-img-news-top' 
                  src={process.env.REACT_APP_API_URL + newsItem.image} 
                  style={{ marginBottom: '-10px' }} />
                <Card.Body style={{display:'flex', flexDirection:'column'}}>
                  <Card.Title className='body-Regular-Gradient' style={{ textAlign: 'center', marginBottom: '4px' }}>
                    {newsItem.date}
                  </Card.Title>
                  <Card.Title className='caption-Gradient' style={{ textAlign: 'center' }}>
                    {newsItem.name}
                  </Card.Title>
                  <Card.Text className='body-Small-Text'>
                    {newsItem.text}
                  </Card.Text>
                    <Button className='button-3 mt-auto' style={{ border: 'none', alignSelf:'center'}}>
                      Подробнее
                    </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Pagination className='mt-5 justify-content-center'>
        <Pagination.Prev 
          style={{ transform: 'translateX(85px)' }} 
          disabled={news.page === 1} 
          onClick={() => handlePageChange(news.page - 1)} />
        <Pagination.Next 
          style={{ transform: 'translateX(85px)' }} 
          disabled={news.page === totalPages} 
          onClick={() => handlePageChange(news.page + 1)} />
        <div style={{ transform: 'translateX(519px)' }}>
          <Button className='button' style={{ border: 'none' }}>
            Больше новостей
          </Button>
        </div>
      </Pagination>
    </div>
  );
});

export default NewsCards;