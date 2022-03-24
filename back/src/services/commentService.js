import { Comment } from '../db';

class commentService {
  static async addComment({ user_id, comment, board_id }) {
    const newComment = { user_id, comment, board_id };
    const createdNewComment = await Comment.create({ newComment });
    createdNewComment.errorMessage = null;
    return createdNewComment;
  }

  static async deleteComment({ comment_id }) {
    const comment = await Comment.findById({ comment_id });
    if (!comment) {
      const errorMessage = '해당 댓글이 없습니다.';
      return { errorMessage };
    }
    const deletedComment = await Comment.delete({ comment_id });
    return deletedComment;
  }
}

export { commentService };
