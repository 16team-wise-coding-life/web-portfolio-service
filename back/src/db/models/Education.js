import { EducationModel } from '../schemas/education';

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ education_id }) {
    const education = await EducationModel.findOne({ _id: education_id });
    return education;
  }
}

export { Education };
