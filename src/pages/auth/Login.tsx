// @mui
import { Grid, Button, TextField, Typography } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

// ----------------------------------------------------------------------

export default function Login() {
  const navigation = useNavigate();

  const defaultValues = {
    email: '',
    password: '',
  };

  const { values, handleChange, handleSubmit, errors } = useForm(defaultValues);

  const handleLogin = async () => {
    const result = await handleSubmit({
      formType: 'LOGIN',
      formParams: {
        email: values.email,
        password: values.password,
      },
    });
    result && navigation('/');
  };

  const moveToSignUpPage = () => {
    navigation('/signup');
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
      <Grid style={{ width: '400px' }}>
        <Typography variant="h2" component="div" gutterBottom align="center">
          로그인
        </Typography>
        <TextField
          type="text"
          placeholder="이메일"
          value={values.email}
          name="email"
          error={errors.email ? true : false}
          helperText={errors.email}
          fullWidth
          style={{ marginBottom: '8px' }}
          onChange={handleChange}
        />
        <TextField
          type="password"
          placeholder="비밀번호"
          value={values.password}
          name="password"
          error={errors.password ? true : false}
          helperText={errors.password}
          fullWidth
          style={{ marginBottom: '8px' }}
          onChange={handleChange}
        />
        <Grid container direction="column" justifyContent="center">
          <Button variant="contained" style={{ margin: '8px 0px' }} onClick={handleLogin}>
            로그인
          </Button>
          <Button onClick={moveToSignUpPage}>계정이 없으신가요? 회원가입 하기</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
