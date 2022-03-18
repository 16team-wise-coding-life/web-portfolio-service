import React, { useState } from 'react';

import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

function Award({ awardCard, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [award, setAward] = useState({ title: awardCard.title, description: awardCard.description, id: awardCard._id });
  // const [title, setTitle] = useState(award.title);
  // const [description, setDescription] = useState(award.description);
  // const [id, setId] = useState(award._id);

  return <>{isEditing ? <AwardEditForm award={award} setAward={setAward} setIsEditing={setIsEditing} /> : <AwardCard award={award} setIsEditing={setIsEditing} isEditable={isEditable} />}</>;
}

export default Award;
