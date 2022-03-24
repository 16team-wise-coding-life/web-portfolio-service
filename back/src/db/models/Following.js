import { FollowingModel } from '../schemas/following';

class Following {
  static async create({ newFollowing }) {
    const createdNewFollowing = await FollowingModel.create(newFollowing);
    return createdNewFollowing;
  }

  static async findAllByUserId({ user_id }) {
    const following = await FollowingModel.find({ user_id: user_id });
    return following;
  }

  static async deleteFollowing({ unfollow }) {
    const deletedFollowing = await FollowingModel.findOneAndDelete(unfollow);
    return deletedFollowing;
  }
}

export { Following };