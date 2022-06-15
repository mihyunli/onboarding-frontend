import React, { useState, useEffect } from 'react';
// @mui
import { Grid, Button, TextField, Typography, InputLabel } from '@mui/material';

// apis
import { createPost, getAllPosts, updatePost, deletePost } from '../../api/blog';

// hooks
import { useNavigate, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

function BlogDetail({ postData }: any) {
  const navigation = useNavigate();
  const postId = useParams().id;

  const [isReadMode, setReadMode] = useState(false);
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    // TODO: props 데이터를 갖고 넘어온경우 props로, 없으면 API 조회로.
    if (!postId) return;
    setReadMode(true);
    getBlogPostDetail();
  }, []);

  const getBlogPostDetail = async () => {
    const posts = await getAllPosts();
    const detail = posts.filter((p: any) => postId && p.id === parseInt(postId))[0];
    setPost(detail);
  };

  const createBlogPost = async () => {
    if (!post.title || !post.body) return alert('제목 또는 내용을 입력하세요.');
    await createPost(post);
    navigation('/dashboard');
  };

  const hadleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deletePost(postId || '');
    navigation('/dashboard');
  };

  const moveToDashboard = () => {
    navigation('/dashboard');
  };

  return (
    <>
      {
        // TODO: 컴포넌트 분리하기
        isReadMode ? (
          <>
            <Typography variant="h2" component="p" gutterBottom>
              {post.title}
            </Typography>
            <Typography component="p" gutterBottom>
              {post.body}
            </Typography>
            <Button
              variant="outlined"
              style={{ width: '30px', marginRight: '4px' }}
              onClick={moveToDashboard}
            >
              목록
            </Button>
            <Button
              variant="contained"
              color="info"
              style={{ width: '30px', marginRight: '4px' }}
              onClick={() => setReadMode(false)}
            >
              수정
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ width: '30px', marginRight: '4px' }}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h2" component="div" gutterBottom>
              글쓰기
            </Typography>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <InputLabel htmlFor="">제목</InputLabel>
              <TextField
                type="text"
                placeholder="제목"
                value={post.title}
                fullWidth
                name="title"
                onChange={hadleChange}
              />
              <InputLabel htmlFor="">내용</InputLabel>
              <TextField
                fullWidth
                multiline
                rows="15"
                value={post.body}
                name="body"
                onChange={hadleChange}
              />
              <Grid container justifyContent="center">
                <Button
                  variant="outlined"
                  style={{ width: '30px', marginRight: '4px' }}
                  onClick={moveToDashboard}
                >
                  목록
                </Button>
                <Button variant="contained" style={{ width: '30px' }} onClick={createBlogPost}>
                  등록
                </Button>
              </Grid>
            </Grid>
          </>
        )
      }
    </>
  );
}

export default BlogDetail;
