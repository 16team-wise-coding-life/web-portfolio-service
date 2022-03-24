import { Comment } from '../db';

class commentService {
  static async addComment({ comment }) {
    const newComment = { comment };
    const createdNewComment = await Comment.create({ newComment });
    createdNewComment.errorMessage = null;
    return createdNewComment;
  }
}

export { commentService };
