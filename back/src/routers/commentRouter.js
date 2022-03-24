import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { commentService } from '../services/commentService';

const commentRouter = Router();
commentRouter.use(login_required);

commentRouter.post('/comment/:board_id', async (req, res, next) => {
  try {
    const { user, content } = req.body;
    const board_id = req.params.board_id;

    const newComment = await commentService.addComment({
      user,
      content,
      board_id,
    });

    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
    }

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
