// @mui
import { Grid, Button, TextField } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';

// ----------------------------------------------------------------------

export default function Login() {
  const navigation = useNavigate();

  interface IFormValues {
    email: string;
    password: string;
  }

  const defaultValues = {
    email: '',
    password: '',
  };

  const { values, handleChange } = useForm<IFormValues>(defaultValues);
  const auth = useAuth();

  const handleLogin = async () => {
    const params = {
      email: values.email,
      password: values.password,
    };

    const res = await auth.login(params);
    console.log('로그인 결과 >>', res);

    navigation('/');
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
      <TextField
        type="text"
        placeholder="이메일"
        value={values.email}
        name="email"
        onChange={handleChange}
      />
      <TextField
        type="password"
        placeholder="비밀번호"
        value={values.password}
        name="password"
        onChange={handleChange}
      />
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={moveToSignUpPage}>회원가입</Button>
    </Grid>
  );
}
