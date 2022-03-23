import React, { useState } from 'react';

import CertificateCard from './CertificateCard';
import CertificateEditForm from './CertificateEditForm';

function Certificate({ certificateCard, isEditable, setIsDeleted }) {
  const { title, description, when_date, _id } = certificateCard;

  const [isEditing, setIsEditing] = useState(false);
  const [certificate, setCertificate] = useState({ title, description, when_date, _id });

  return (
    <>
      {isEditing ? (
        <CertificateEditForm certificate={certificate} setCertificate={setCertificate} setIsEditing={setIsEditing} />
      ) : (
        <CertificateCard certificate={certificate} setIsEditing={setIsEditing} isEditable={isEditable} setIsDeleted={setIsDeleted} />
      )}
    </>
  );
}

export default Certificate;
