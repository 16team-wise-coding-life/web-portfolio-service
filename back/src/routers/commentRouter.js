import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { commentService } from '../services/commentService';

const commentRouter = Router();
commentRouter.use(login_required);

commentRouter.post('/freeboard/comment/create', async (req, res, next) => {
  try {
    const { board_id, user_id, name, content } = req.body;

    const newComment = await commentService.addComment({
      board_id,
      user_id,
      name,
      content,
    });

    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
    }

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

// 특정 댓글 조회 API
commentRouter.get('/freeboard/comments/:id', async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const currentComment = await commentService.getComment({ comment_id });

    if (currentComment.errorMessage) {
      throw new Error(currentComment.errorMessage);
    }

    res.status(200).send(currentComment);
  } catch (error) {
    next(error);
  }
});

// 특정 댓글 수정 API
commentRouter.put('/freeboard/comments/:id', async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const board_id = req.body.board_id ?? null;
    const user_id = req.body.user_id ?? null;
    const name = req.body.name ?? null;
    const content = req.body.content ?? null;
    const created_at = req.body.created_at ?? null;

    const toUpdate = { board_id, user_id, name, content, created_at };

    const updatedComment = await commentService.setComment({ comment_id, toUpdate });

    if (updatedComment.errorMessage) {
      throw new Error(updatedComment.errorMessage);
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.delete('/freeboard/comment/:id', async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const deletedComment = await commentService.deleteComment({
      comment_id,
    });
    if (deletedComment.errorMessage) {
      throw new Error(deletedComment.errorMessage);
    }
    res.status(200).send(deletedComment);
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
