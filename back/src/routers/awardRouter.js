import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { awardService } from '../services/awardService';

const awardRouter = Router();

awardRouter.post('/award/create', login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // Add db
    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (e) {
    next(e);
  }
});

awardRouter.get('/awards/:id', login_required, async function (req, res, next) {
  try {
    const award_id = req.params.id;
    const currentAwardInfo = await awardService.getAwardInfo({ award_id });

    if (currentAwardInfo.errorMessage) {
      throw new Error(currentAwardInfo.errorMessage);
    }

    res.status(200).send(currentAwardInfo);
  } catch (e) {
    next(e);
  }
});

awardRouter.put('/awards/:id', login_required, async function (req, res, next) {
  try {
    const award_id = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    const updatedAward = await awardService.setAward({ award_id, toUpdate });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (e) {
    next(e);
  }
});

awardRouter.get('/awardlist/:user_id', login_required, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const awards = await awardService.getAwards({ user_id });
    res.status(200).send(awards);
  } catch (e) {
    next(e);
  }
});

export { awardRouter };