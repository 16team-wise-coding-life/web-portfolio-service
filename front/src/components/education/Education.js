import React, { useState } from 'react';
import EducationEditForm from './EducationEditForm';

const Education = () => {
  const [isEditing, setIsEditing] = useState('false');
  return (
    <>
      {isEditing ? (
          <EducationEditForm 
          />
      ) : ()}
    </>
  );
}

export default Education;