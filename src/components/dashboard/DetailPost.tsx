// mui
import { Button, Typography, Box } from '@mui/material';
// component
import ProfileCard from './ProfileCard';
// utils
import { fDateTimeKor } from '../../utils/formatTime';

export default function DetailPost({ post, moveToDashboard, setMode, handleDelete }: any) {
  const formatDate = (dateTime: string) => {
    const newdate = new Date(dateTime.substring(0, 19));
    return fDateTimeKor(newdate);
  };
  return (
    <>
      <Typography variant="h2" component="p" gutterBottom>
        {post.title}
      </Typography>
      <Typography component="p" gutterBottom>
        {post.body}
      </Typography>
      <Typography component="p" gutterBottom>
        작성일: {formatDate(post.createdAt)}
      </Typography>
      <Typography component="p" gutterBottom>
        수정일: {formatDate(post.updatedAt)}
      </Typography>
      <Box style={{ width: '400px' }}>
        <ProfileCard author={post.author} />
      </Box>

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
    </>
  );
}
