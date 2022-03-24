import { CommentModel } from '../schemas/comment';

class Comment {
  static async create({ newComment }) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }
}

export { Comment };
