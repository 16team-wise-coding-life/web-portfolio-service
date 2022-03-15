import { CertificateModel } from '../schemas/certificate';

class Certificate {
  static async create({ newCertificate }) {
    const createdCertificate = await CertificateModel.create(newCertificate);
    return createdCertificate;
  }
}

export { Certificate };
