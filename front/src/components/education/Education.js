import React, { useState } from 'react';
import EducationCard from './EducationCard';
import EducationEditForm from './EducationEditForm';

const Education = (education, setEducation) => {
  const [isEditing, setIsEditing] = useState('false');
  return (
    <>
      {isEditing ? (
        <EducationEditForm currenteducation={education} setEducation={setEducation} setIsEditing={setIsEditing}></EducationEditForm>
      ) : (
        <EducationCard education={education} setEducation={setEducation} setIsEditing={setIsEditing}></EducationCard>
      )}
    </>
  );
};

export default Education;
