// mui
import { Button, Typography, Box, Container } from '@mui/material';
// component
import ProfileCard from './ProfileCard';
// utils
import { fDateTimeKor } from '../../utils/formatTime';
// hooks
import useAuth from '../../hooks/useAuth';

export default function DetailPost({ post, moveToDashboard, setMode, handleDelete }: any) {
  const formatDate = (dateTime: string) => {
    const newdate = new Date(dateTime.substring(0, 19));
    return fDateTimeKor(newdate);
  };

  const { user } = useAuth();
  const isAuthor = post.authorId === user?.id;

  return (
    <>
      <Container>
        <Typography variant="h2" component="p" gutterBottom>
          {post.title}
        </Typography>
        <Typography
          component="p"
          variant="caption"
          color="text.secondary"
          style={{ marginLeft: '8px' }}
        >
          <span style={{ fontStyle: 'italic' }}>by </span>
          {post.author.username} &#183; {formatDate(post.createdAt)}
        </Typography>
        <Typography component="p" style={{ margin: '16px 8px', whiteSpace: 'pre-wrap' }}>
          {post.body}
        </Typography>
        <Box style={{ width: '500px', marginTop: '40px' }}>
          <ProfileCard author={post.author} />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Box>
            <Button
              variant="outlined"
              style={{ width: '30px', marginRight: '4px' }}
              onClick={moveToDashboard}
            >
              목록
            </Button>
          </Box>
          {isAuthor && (
            <Box>
              <Button
                variant="contained"
                color="info"
                style={{ width: '30px', marginRight: '4px' }}
                onClick={() => setMode('modify')}
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
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
