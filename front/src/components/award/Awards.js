import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import Award from './Award';
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
      <Card className='mb-3'>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          <Card.Text>
            {awards.map(award => {
              return <Award key={award._id} awardCard={award} isEditable={isEditable} />;
            })}
          </Card.Text>
          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <AwardAddForm awards={awards} setAwards={setAwards} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Awards;
