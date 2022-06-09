import React, { useState } from 'react';

// ----------------------------------------------------------------------

export default function useForm<ValueType>(defaultValue: ValueType) {
  const [values, setValues] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // TODO: erros
  //   const [errors, setErrors] = useState(defaultValue);

  // TODO: handleSubmit
  const handleSubmit = () => {};

  // TODO: reset
  const resetForm = () => {};

  return { values, handleChange, handleSubmit, resetForm };
}
