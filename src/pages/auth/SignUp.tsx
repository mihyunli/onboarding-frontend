// @mui
import { Button, TextField, Grid } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function SignUp() {
  const { themeStretch } = useSettings();

  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const handleSignUp = () => {
    navigation('/');
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <TextField
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="비밀번호 확인"
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={handleSignUp}>취소</Button>
        <Button onClick={handleSignUp}>회원가입</Button>
      </Grid>
    </>
  );
}
