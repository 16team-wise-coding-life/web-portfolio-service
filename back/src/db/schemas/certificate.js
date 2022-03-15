import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    when_date: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model('Certificate', CertificateSchema);

export { CertificateModel };
