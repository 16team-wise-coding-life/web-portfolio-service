import { Following } from '../db';

class followingService {
  static async addFollowing({ user_id, following_id }) {
    const newFollowing = { user_id, following_id };
    const createdNewFollowing = await Following.create({ newFollowing });
    createdNewFollowing.errorMessage = null;
    return createdNewFollowing;
  }

  static async getFollowing({ user_id }) {
    const following = await Following.findAllByUserId({ user_id });

    if (!following) {
      const errorMessage = '팔로우 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return following;
  }

  static async deleteFollowing({ user_id, following_id }) {
    const unfollow = { user_id, following_id };

    const deletedFollowing = await Following.deleteFollowing({ unfollow });
    deletedFollowing.errorMessage = null;

    return deletedFollowing;
  }
}

export { followingService };
