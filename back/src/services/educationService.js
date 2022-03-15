import { Education } from '../db';
import { v4 as uuidv4 } from 'uuid';

class EducationService {
  static async addEducation({ user_id, school, major, position }) {
    const education_id = uuidv4();
    const newEducation = {
      id: education_id,
      user_id,
      school,
      major,
      position,
    };

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  static async getEducationInfo({ education_id }) {
    const education = await Education.findById({ education_id });

    if (!education) {
      const errorMessage = '해당 이메일은 학력이 없습니다.';
      return { errorMessage };
    }

    return education;
  }
}

export { EducationService };
