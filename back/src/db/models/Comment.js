import { CommentModel } from '../schemas/comment';

class Comment {
  static async create({ newComment }) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }

  static async findById({ comment_id }) {
    const comment = await CommentModel.findOne({ _id: comment_id });
    return comment;
  }

  static async delete({ comment_id }) {
    const deletedComment = await CommentModel.deleteOne({ _id: comment_id });
    return deletedComment;
  }
}

export { Comment };
