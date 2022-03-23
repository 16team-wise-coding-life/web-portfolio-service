import { FollowingModel } from '../schemas/following';

class Following {
  static async findAllByUserId({ user_id }) {
    const following = await FollowingModel.find({ user_id: user_id });
    return following;
  }
}

export { Following };
