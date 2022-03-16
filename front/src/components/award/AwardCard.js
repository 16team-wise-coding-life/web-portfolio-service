import React, { useState, useEffect } from 'react';

import Award from './Award';
import AwardEditForm from './AwardEditForm';

function AwardCard({ awardCard, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [award, setAward] = useState({ title: awardCard.title, description: awardCard.description, id: awardCard._id });
  // const [title, setTitle] = useState(award.title);
  // const [description, setDescription] = useState(award.description);
  // const [id, setId] = useState(award._id);

  return <>{isEditing ? <AwardEditForm award={award} setAward={setAward} setIsEditing={setIsEditing} /> : <Award award={award} setAward={setAward} isEditable={isEditable} />}</>;
}

export default AwardCard;
