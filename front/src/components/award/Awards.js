import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import Award from './Award';
import AwardEditForm from './AwardEditForm';

function Awards({ portfolioOwnerId, isEditable }) {
  /* useEffect로 portfolioOwnerId로 수상이력 GET 요청 -> award를 res.data로 세팅하기 */
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>

          {/* props로 award, setIsEditing 넘기기
          isEditing이 true-> AwardEditForm
          false-> Award*/}
          {isEditing ? <AwardEditForm setIsEditing={setIsEditing} /> : <Award setIsEditing={setIsEditing} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Awards;
