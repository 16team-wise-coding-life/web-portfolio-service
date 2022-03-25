import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';

import { UserStateContext } from '../../App';
import * as Api from '../../api';

import Comments from '../comment/Comments';

function PostView() {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const fetchPostInfo = async postId => {
    try {
      const { data: postData } = await Api.get('freeboard', postId);
      if (postData?.user_id === userState.user?.id) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
      setPostInfo(postData);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }

    fetchPostInfo(params.postId);
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  const deleteNavigate = async () => {
    try {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        await Api.delete('freeboard', params.postId);
        navigate(`/freeboard`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Card>
          <Card.Header>
            <Card.Title>{postInfo.title}</Card.Title>
            작성자 : {postInfo.name} 작성 시간 : {postInfo.created_at}
          </Card.Header>
          <Card.Body>
            {postInfo.content?.split('\n')?.map((line, index) => (
              <Card.Text key={index}>
                {line}
                <br />
              </Card.Text>
            ))}
          </Card.Body>
          <Card.Footer className="text-center">
            <Button variant="primary" className="me-2" onClick={() => navigate(`/freeboard`)}>
              목록
            </Button>
            {isEditable && (
              <Button variant="primary" className="me-2" onClick={() => navigate(`/freeboard/edit/${postInfo._id}`)}>
                수정
              </Button>
            )}
            {isEditable && (
              <Button variant="primary" className="me-2" onClick={() => deleteNavigate()}>
                삭제
              </Button>
            )}
          </Card.Footer>
        </Card>
        <Comments cur_user_id={userState.user.id} cur_user_name={userState.user.name} board_id={postInfo._id} />
      </Row>
    </Container>
  );
}

export default PostView;
