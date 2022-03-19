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

  static async findAllById({ user_id }) {
    const educations = await EducationModel.find({ user_id: user_id });
    return educations;
  }

  static async update({ education_id, fieldToUpdate, newValue }) {
    const filter = { _id: education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(filter, update, option);
    return updatedEducation;
  }
}

export { Education };
