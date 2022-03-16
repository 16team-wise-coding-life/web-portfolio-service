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
}

export { Certificate };
