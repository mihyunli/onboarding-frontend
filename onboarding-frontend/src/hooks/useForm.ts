import React, { useState } from 'react';
import useAuth from './useAuth';

// ----------------------------------------------------------------------

interface IFormParams {
  [index: string]: string | undefined;
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}

export default function useForm(defaultValue: IFormParams) {
  const [values, setValues] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const formValidator = () => {
    let result = true;
    let errorMessages = {} as IFormParams;

    for (const key in values) {
      if (values[key] === '') {
        errorMessages[key] = '필수 정보입니다.';
        result = false;
      }
    }
    if (values.email && !checkEmailType(values.email)) {
      errorMessages.email = '이메일 형식이 올바르지 않습니다.';
      result = false;
    }
    if (values.password && !checkPasswordType(values.password)) {
      errorMessages.password = '비밀번호 형식이 올바르지 않습니다.';
      result = false;
    }
    if (
      values.password &&
      values.confirmPassword &&
      !checkConfirmPassword(values.password, values.confirmPassword)
    ) {
      errorMessages.confirmPassword = '비밀번호 확인이 일치하지 않습니다.';
      result = false;
    }
    setErrors(errorMessages);
    return result;
  };

  interface ISubmitPayload {
    formType: string;
    formParams: IFormParams;
  }

  const handleSubmit = ({ formType, formParams }: ISubmitPayload) => {
    if (!formValidator()) return;

    if (formType === 'SIGNUP') {
      auth.register(formParams);
      return true;
    } else if (formType === 'LOGIN') {
      auth.login(formParams);
      return true;
    }
  };

  const resetForm = () => {
    setValues(defaultValue);
    setErrors(defaultValue);
  };

  return { values, handleChange, errors, handleSubmit, resetForm };
}

const checkEmailType = (email: string) => {
  // 영소문자 + 숫자 + 언더바/하이픈 허용 4~20자리
  const emailPattern = /^[a-z0-9_-]{4,20}$/;
  return emailPattern.test(email);
};

const checkPasswordType = (password: string) => {
  // 숫자영문 조합 8~20자리
  const pwPattern = /^[a-zA-Z0-9]{8,20}$/;
  return pwPattern.test(password);
};

const checkConfirmPassword = (password: string, confirmPassword: string) =>
  password === confirmPassword;
