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

  static async getEducations({ user_id }) {
    const educations = await Education.findAllById({ user_id });
    return educations;
  }

  static async setEducation({ education_id, toUpdate }) {
    let education = await Education.findAllById({ education_id });

    if (!education) {
      const errorMessage = '학력이 존재하지 않습니다.';
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = 'school';
      const newValue = toUpdate.school;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = 'major';
      const newValue = toUpdate.major;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = 'position';
      const newValue = toUpdate.position;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    return education;
  }
}

export { EducationService };
