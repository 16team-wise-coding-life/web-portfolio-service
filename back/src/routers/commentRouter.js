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
