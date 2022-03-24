import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

import { UserStateContext } from '../../App';
import * as Api from '../../api';

function PostView() {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const fetchPostInfo = async postId => {
    const res = await Api.get('freeboard', postId);
    const postData = res.data;
    if (postData?.user_id === userState.user?.id) {
      setIsEditable(true);
    }
    setPostInfo(postData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }

    const postId = params.postId;
    fetchPostInfo(postId);
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <Container fluid>
      <Card>
        <Card.Header>
          <Card.Title>{postInfo.title}</Card.Title>
          작성자 : {postInfo.name} 작성 시간 : {postInfo.created_at}
        </Card.Header>
        <Card.Body>
          <Card.Text>{postInfo.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary" type="submit" className="me-2" onClick={() => navigate(`/freeboard`)}>
            목록
          </Button>
          {isEditable && (
            <Button variant="primary" type="submit" className="me-2" onClick={() => navigate(`/freeboard/edit/${params.postId}`)}>
              수정
            </Button>
          )}
          {isEditable && (
            <Button
              variant="primary"
              type="submit"
              className="me-2"
              onClick={() => {
                if (window.confirm('게시글을 삭제하시겠습니까?')) {
                  Api.delete('freeboard', params.postId);
                  navigate(`/freeboard`);
                }
              }}
            >
              삭제
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default PostView;
