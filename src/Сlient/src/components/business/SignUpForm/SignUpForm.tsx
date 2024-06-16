import { SignUp } from '@/types/SignUp';
import { FormEvent, useCallback, useState } from 'react';

const SignUpForm = () => {
  const [signUpForm, setSignUpForm] = useState<SignUp>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const body = {
        email: signUpForm.email,
        password: signUpForm.password,
        repeatPassword: signUpForm.repeatPassword,
      };

      const response = await fetch(
        'https://your-backend-endpoint.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('jwtToken', token);
        setError('');
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || 'Wrong email or password. Please try again.'
        );
      }
    } catch (err) {
      setError('Wrong email or password. Please try again.');
    }
  };

  const onChange = useCallback(
    (key: keyof SignUp) => (value: string) => {
      setSignUpForm({ ...signUpForm, [key]: value });
    },
    [signUpForm]
  );

  return <h1>Sign up</h1>;
};

export default SignUpForm;
