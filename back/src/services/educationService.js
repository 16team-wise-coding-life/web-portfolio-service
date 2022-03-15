import { Education } from '../db';

class EducationService {
  // 학력 추가
  static async addEducation({ school, major, finalEducation }) {
    const newEducation = { school, major, finalEducation };
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }
  // 사용자가 작성한 모든 학력 가져옴
  static async getEducations() {
    const educations = await Education.findAll();
    return educations;
  }
}

export { EducationService };
