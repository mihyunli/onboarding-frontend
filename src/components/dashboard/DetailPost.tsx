import React from 'react';

import { Button, Typography } from '@mui/material';

export default function DetailPost({ post, moveToDashboard, setMode, handleDelete }: any) {
  return (
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
