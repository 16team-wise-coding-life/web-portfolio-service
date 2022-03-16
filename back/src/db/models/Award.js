import { AwardModel } from '../schemas/award';

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ _id: award_id });
    return award;
  }

  static async findAllByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id: user_id });
    return awards;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { _id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateAward = await AwardModel.findOneAndUpdate(filter, update, option);
    return updateAward;
  }
}

export { Award };
