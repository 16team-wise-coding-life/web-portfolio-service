import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { certificateAuthService } from '../services/certificateService';

const certificateAuthRouter = Router();

certificateAuthRouter.use(login_required);

// create API
certificateAuthRouter.post('/certificate/create', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    // req (request) 에서 데이터 가져오기
    const { user_id, title, description, when_date } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newCertificate = await certificateAuthService.addCertificate({
      user_id,
      title,
      description,
      when_date,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 특정 게시글 조회 API
certificateAuthRouter.get('/certificates/:id', async function (req, res, next) {
  try {
    const certificate_id = req.params.id;
    const currentCertificateInfo = await certificateAuthService.getCertificateInfo({ certificate_id });

    if (currentCertificateInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentCertificateInfo);
  } catch (error) {
    next(error);
  }
});

export { certificateAuthRouter };
