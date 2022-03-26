import { Like } from '../db';

class likeService {
  static async addLike({ user_id, like_id }) {
    const newLike = { user_id, like_id };
    const createdNewLike = await Like.create({ newLike });
    createdNewLike.errorMessage = null;
    return createdNewLike;
  }

  static async deleteLike({ user_id, like_id }) {
    const unlike = { user_id, like_id };
    const deletedLike = await Like.deleteLike({ unlike });
    deletedLike.errorMessage = null;

    return deletedLike;
  }
}

export { likeService };
