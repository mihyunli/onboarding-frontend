import { useState } from 'react';

// @mui
import { Button, TextField, Grid } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

// ----------------------------------------------------------------------

interface IFormValues {
  [index: string]: string;
  email: string;
  name: string;
  pw: string;
  pwCheck: string;
}

export default function SignUp() {
  const navigation = useNavigate();

  const defaultValues = {
    email: '',
    name: '',
    pw: '',
    pwCheck: '',
  };

  const [errors, setErrors] = useState(defaultValues);

  const { values, handleChange } = useForm<IFormValues>(defaultValues);

  const handleSignUp = () => {
    if (!isValid()) return console.log('유효성 검사 실패');

    navigation('/');
  };

  const isValid = () => {
    let result: boolean;
    let errorMessages = {} as IFormValues;

    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const pwPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    const { email, name, pw, pwCheck } = values;

    for (const key in values) {
      if (values[key] === '') errorMessages[key] = `필수 정보입니다.`;
      result = false;
    }
    if (email && !emailPattern.test(email)) {
      errorMessages.email = `이메일 형식이 올바르지 않습니다.`;
      result = false;
    }
    if (name && name.length > 10) {
      errorMessages.name = `이름은 10자 이내로 입력해주세요.`;
      result = false;
    }
    if (pw && !pwPattern.test(pw)) {
      errorMessages.pw = `비밀번호는 8자 이상 20자 이내로 영문 대소문자 및 특수문자를 포함해야 합니다.`;
      result = false;
    }
    if (pw && pwCheck && pw !== pwCheck) {
      errorMessages.pwCheck = `비밀번호 확인이 일치하지 않습니다.`;
      result = false;
    }
    setErrors(errorMessages);
    result = true;

    return result;
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
        <TextField
          type="email"
          placeholder="이메일"
          value={values.email}
          name="email"
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={handleChange}
        />
        <TextField
          type="text"
          placeholder="이름"
          value={values.name}
          name="name"
          error={errors.name ? true : false}
          helperText={errors.name}
          onChange={handleChange}
        />
        <TextField
          type="password"
          placeholder="비밀번호"
          value={values.pw}
          name="pw"
          error={errors.pw ? true : false}
          helperText={errors.pw}
          onChange={handleChange}
        />
        <TextField
          type="password"
          placeholder="비밀번호 확인"
          value={values.pwCheck}
          name="pwCheck"
          error={errors.pwCheck ? true : false}
          helperText={errors.pwCheck}
          onChange={handleChange}
        />
        <Grid container justifyContent="center">
          <Button onClick={moveToLoginPage}>취소</Button>
          <Button onClick={handleSignUp}>회원가입</Button>
        </Grid>
      </Grid>
    </>
  );
}
