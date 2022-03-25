import { Comment } from '../db';

class commentService {
  static async addComment({ board_id, user_id, name, content }) {
    const newComment = { board_id, user_id, name, content };
    const createdNewComment = await Comment.createComment({ newComment });
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
