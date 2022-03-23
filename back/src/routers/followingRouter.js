import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { followingService } from '../services/followingService';

const followingRouter = Router();
followingRouter.use(login_required);

// 모든팔로우 조회 API
followingRouter.get('/followinglist/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const following = await followingService.getFollowing({ user_id });

    res.status(200).send(following);
  } catch (error) {
    next(error);
  }
});

followingRouter.delete('/following/delete', async (req, res, next) => {
  try {
    const { user_id, following_id } = req.body;

    const deleteFollowing = await followingService.deleteFollowing({
      user_id,
      following_id,
    });

    if (deleteFollowing.errorMessage) {
      throw new Error(deleteFollowing.errorMessage);
    }
    res.status(200).send(deleteFollowing);
  } catch (error) {
    next(error);
  }
});

export { followingRouter };
