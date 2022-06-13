// @mui
import { Button, TextField, Grid, Typography } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

// ----------------------------------------------------------------------

export default function SignUp() {
  const navigation = useNavigate();

  const defaultValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const { values, handleChange, errors, handleSubmit, resetForm } = useForm(defaultValues);

  const handleSignUp = async () => {
    const result = await handleSubmit({
      formType: 'SIGNUP',
      formParams: {
        email: values.email,
        username: values.username,
        password: values.password,
      },
    });
    result && navigation('/login');
  };

  const moveToLoginPage = () => {
    navigation('/login');
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
        <Grid style={{ width: '500px' }}>
          <Typography variant="h2" component="div" gutterBottom align="center">
            회원가입
          </Typography>
          <Grid container justifyContent="end">
            <Button style={{ color: 'grey' }} onClick={resetForm}>
              초기화
            </Button>
          </Grid>
          <TextField
            type="email"
            placeholder="이메일"
            value={values.email}
            name="email"
            error={errors.email ? true : false}
            helperText={
              errors.email ||
              '* 이메일은 영소문자, 숫자, 언더바, 하이픈을 사용해 4~20자리로 구성되어야 합니다.'
            }
            fullWidth
            style={{ marginBottom: '8px' }}
            onChange={handleChange}
          />
          <TextField
            type="text"
            placeholder="이름"
            value={values.username}
            name="username"
            error={errors.username ? true : false}
            helperText={errors.username}
            style={{ marginBottom: '8px' }}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            type="password"
            placeholder="비밀번호"
            value={values.password}
            name="password"
            error={errors.password ? true : false}
            helperText={
              errors.password || '* 비밀번호는 영문, 숫자를 조합한 8~20자리로 구성되어야 합니다.'
            }
            fullWidth
            style={{ marginBottom: '8px' }}
            onChange={handleChange}
          />
          <TextField
            type="password"
            placeholder="비밀번호 확인"
            value={values.confirmPassword}
            name="confirmPassword"
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
            style={{ marginBottom: '18px' }}
            fullWidth
            onChange={handleChange}
          />
          <Grid container direction="column" justifyContent="center">
            <Button variant="contained" style={{ margin: '8px 0px' }} onClick={handleSignUp}>
              회원가입
            </Button>
            <Button onClick={moveToLoginPage}>이미 계정이 있으신가요? 로그인 하기</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
