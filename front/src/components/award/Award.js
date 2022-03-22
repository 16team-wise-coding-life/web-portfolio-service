import React, { useState } from 'react';

import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

function Award({ awardCard, isEditable, setIsDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [award, setAward] = useState({ title: awardCard.title, description: awardCard.description, id: awardCard._id });

  return (
    <>
      {isEditing ? (
        <AwardEditForm award={award} setAward={setAward} setIsEditing={setIsEditing} />
      ) : (
        <AwardCard award={award} setIsEditing={setIsEditing} isEditable={isEditable} setIsDeleted={setIsDeleted} />
      )}
    </>
  );
}

export default Award;
