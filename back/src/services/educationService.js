import { Education } from '../db';

class EducationService {
  static async addEducation({ user_id, school, major, position }) {
    const newEducation = {
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
      const errorMessage = '학력이 존재하지 않습니다.';
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

  static async deleteEducation({ education_id }) {
    const education = await Education.delete({ education_id });
    return education;
  }
}

export { EducationService };
