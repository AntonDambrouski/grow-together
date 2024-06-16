import { Login } from '@/types/Login';
import { FormEvent, useCallback, useState } from 'react';
import AuthLayout from '../AuthLayout/AuthLayout';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import classes from './LoginForm.module.css';
import { useGlobalState } from '@/GlobalStateContext';
import Image from 'next/image';

const LoginForm = () => {
  const { setIsLoggedIn, setProjects } = useGlobalState();
  const [error, setError] = useState<string>('');

  const onGooglePayLogin = async () => {
    try {
      const response = await fetch(
        'https://grow-together.azurewebsites.net/api/auth/google-login'
      );

      if (response.ok) {
        const data = await response.json();
        setError('');
        setIsLoggedIn(true);
        setProjects(data);
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const onFacebookLogin = async () => {
    try {
      const response = await fetch(
        'https://grow-together.azurewebsites.net/api/auth/google-login'
      );

      if (response.ok) {
        const data = await response.json();
        setError('');
        setIsLoggedIn(true);
        setProjects(data);
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <Form onSubmit={() => {}}>
        <h1>Login</h1>
        {error && <span className={classes.error}>{error}</span>}
        <div className={classes.buttonWrapper}>
          <Button className={classes.button} onClick={onGooglePayLogin}>
            <Image
              className={classes.image}
              src="/static/images/google.png"
              alt="login with google"
              width={24}
              height={24}
            />
            Login with google pay
          </Button>
          <Button className={classes.button} onClick={onFacebookLogin}>
            <Image
              className={classes.image}
              src="/static/images/facebook.png"
              alt="login with google"
              width={24}
              height={24}
            />
            Login with facebook
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
