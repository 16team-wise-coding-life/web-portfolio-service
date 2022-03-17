import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { certificateAuthService } from '../services/certificateService';

const certificateAuthRouter = Router();

certificateAuthRouter.use(login_required);

// create API
certificateAuthRouter.post('/certificate/create', async (req, res, next) => {
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
certificateAuthRouter.get('/certificates/:id', async (req, res, next) => {
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

// 특정 게시글 수정 API
certificateAuthRouter.put('/certificates/:id', async (req, res, next) => {
  try {
    const certificate_id = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;

    const toUpdate = { title, description, when_date };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedCertificate = await certificateAuthService.setCertificate({ certificate_id, toUpdate });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
});

// 특정 유저 자격증 목록 조회 API
certificateAuthRouter.get('/certificatelist/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const certificates = await certificateAuthService.getCertificates({ user_id });

    res.status(200).send(certificates);
  } catch (error) {
    next(error);
  }
});

export { certificateAuthRouter };
