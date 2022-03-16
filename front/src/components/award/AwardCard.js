import React, { useState, useEffect } from 'react';

import Award from './Award';
import AwardEditForm from './AwardEditForm';

function AwardCard({ award, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);
  const [id, setId] = useState(award._id);

  return (
    <>
      {isEditing ? (
        <AwardEditForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} id={id} setIsEditing={setIsEditing} />
      ) : (
        <Award title={title} description={description} setIsEditing={setIsEditing} isEditable={isEditable} />
      )}
    </>
  );
}

export default AwardCard;
