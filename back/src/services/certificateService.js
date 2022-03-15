import { Certificate } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certificateAuthService {
  static async addCertificate({ user_id, title, description, when_date }) {
    if (!title || !description) {
      const errorMessage = '제목과 상세내역을 입력해 주세요.';
      return { errorMessage };
    }
    const newCertificate = { user_id, title, description, when_date };

    // db에 저장
    const createdCertificate = await Certificate.create({ newCertificate });
    createdCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdCertificate;
  }
}

export { certificateAuthService };
