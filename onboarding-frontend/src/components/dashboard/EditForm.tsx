import React from 'react';
// @mui
import { Grid, Button, TextField, Typography, InputLabel } from '@mui/material';

export default function EditForm({ mode, post, hadleChange, moveToDashboard, handelSave }: any) {
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        글쓰기
      </Typography>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <InputLabel htmlFor="">제목</InputLabel>
        <TextField
          type="text"
          placeholder="제목을 입력하세요"
          value={post.title}
          fullWidth
          name="title"
          inputProps={{ maxLength: 255 }}
          onChange={hadleChange}
        />
        <InputLabel htmlFor="">내용</InputLabel>
        <TextField
          fullWidth
          multiline
          rows="15"
          value={post.body}
          name="body"
          inputProps={{ maxLength: 1000 }}
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
          <Button variant="contained" style={{ width: '30px' }} onClick={handelSave}>
            저장
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
