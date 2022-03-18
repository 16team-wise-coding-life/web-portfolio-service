import { CertificateModel } from '../schemas/certificate';

class Certificate {
  static async create({ newCertificate }) {
    const createdCertificate = await CertificateModel.create(newCertificate);
    return createdCertificate;
  }

  static async findById({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ _id: certificate_id });
    return certificate;
  }

  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { _id: certificate_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const certificate = await CertificateModel.findOneAndUpdate(filter, update, option);
    return certificate;
  }

  static async findAllByUserId({ user_id }) {
    const certificates = await CertificateModel.find({ user_id: user_id });
    return certificates;
  }
}

export { Certificate };
