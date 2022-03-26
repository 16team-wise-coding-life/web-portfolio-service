import { LikeModel } from '../schemas/Like';

class Like {
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  static async deleteLike({ unlike }) {
    const deletedLike = await LikeModel.findOneAndDelete(unlike);
    return deletedLike;
  }
}

export { Like };
