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

export { followingRouter };
