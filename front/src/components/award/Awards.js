import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import Award from './Award';
import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';
import AwardAddForm from './AwardAddForm';
import * as Api from '../../api';

function Awards({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    Api.get(`awardlist/${portfolioOwnerId}`).then(res => setAwards(res.data));
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          {awards.map(a => {
            return <AwardCard key={a._id} awardCard={a} isEditable={isEditable} />;
          })}
          <Row className='mt-3 text-center mb-4'>
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
          {isAdding && <AwardAddForm awards={awards} setAwards={setAwards} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Awards;
