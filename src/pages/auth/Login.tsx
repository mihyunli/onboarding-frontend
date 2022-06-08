// @mui
import { Grid, Button, TextField } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Login() {
  const { themeStretch } = useSettings();

  const navigation = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    console.log('메인으로 이동', id, pw);
    navigation('/');
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <TextField
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={handleLogin}>회원가입</Button>
    </Grid>
  );
}
