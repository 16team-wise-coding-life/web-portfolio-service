import { Award } from '../db';

class awardService {
  static async addAward({ user_id, title, description }) {
    const newAward = { user_id, title, description };
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;
    return createdNewAward;
  }

  static async getAwards({ user_id }) {
    const awards = await Award.findAllByUserId({ user_id });
    return awards;
  }

  static async setAward({ award_id, toUpdate }) {
    let award = await Award.findById({ award_id });

    if (!award) {
      const errorMessage = '수상 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    return award;
  }

  static async getAwardInfo({ award_id }) {
    const award = await Award.findById({ award_id });

    if (!award) {
      const errorMessage = '해당 수상 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return award;
  }
}

export { awardService };
