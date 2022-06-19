// @mui
import { Button, TextField, Typography, Container, Box } from '@mui/material';

export default function EditForm({ mode, post, hadleChange, goBackToPrevPage, handelSave }: any) {
  return (
    <>
      <Container>
        <Typography variant="h2" component="div" gutterBottom>
          {mode === 'create' ? '글쓰기' : '수정하기'}
        </Typography>
        <TextField
          type="text"
          placeholder="제목을 입력하세요"
          value={post.title}
          name="title"
          fullWidth
          variant="standard"
          inputProps={{ maxLength: 255, style: { fontSize: 30 } }}
          style={{ margin: '20px 0px' }}
          onChange={hadleChange}
        />
        <TextField
          multiline
          fullWidth
          placeholder="내용을 입력하세요"
          rows="15"
          value={post.body}
          name="body"
          inputProps={{ maxLength: 1000 }}
          onChange={hadleChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
          <Button
            variant="outlined"
            style={{ width: '30px', marginRight: '4px' }}
            onClick={goBackToPrevPage}
          >
            취소
          </Button>
          <Button variant="contained" style={{ width: '30px' }} onClick={handelSave}>
            저장
          </Button>
        </Box>
      </Container>
    </>
  );
}
