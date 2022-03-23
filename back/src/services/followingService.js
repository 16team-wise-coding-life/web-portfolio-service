import { Following } from '../db';

class followingService {
  static async getFollowing({ user_id }) {
    const following = await Following.findAllByUserId({ user_id });

    if (!following) {
      const errorMessage = '팔로우 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return following;
  }
}

export { followingService };
