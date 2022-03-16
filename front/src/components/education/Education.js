import React, { useState } from 'react';
import EducationCard from './EducationCard';
import EducationEditForm from './EducationEditForm';

const Education = ({ education, setEducation, isEditable }) => {
  const [isEditing, setIsEditing] = useState('false');
  return (
    <>
      {isEditing ? (
        <EducationEditForm currentEducation={education} setEducation={setEducation} setIsEditing={setIsEditing}></EducationEditForm>
      ) : (
        <EducationCard education={education} isEditable={isEditable} setIsEditing={setIsEditing}></EducationCard>
      )}
    </>
  );
};

export default Education;