import React, { useState } from 'react';

import Certificate from './Certificate';
import CertificateEditForm from './CertificateEditForm';

function CertificateCard({ certificateCard, isEditable }) {
  const { title, description, when_date, _id } = certificateCard;

  const [isEditing, setIsEditing] = useState(false);
  const [certificate, setCertificate] = useState({ title, description, when_date, _id });

  return (
    <>
      {isEditing ? (
        <CertificateEditForm certificate={certificate} setCertificate={setCertificate} setIsEditing={setIsEditing} />
      ) : (
        <Certificate certificate={certificate} setIsEditing={setIsEditing} isEditable={isEditable} />
      )}
    </>
  );
}

export default CertificateCard;
