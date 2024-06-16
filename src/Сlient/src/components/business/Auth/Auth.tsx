import Button from '../../ui/Button/Button';
import classes from './Auth.module.css'

const Auth = () => {
  return (
    <div className={classes.Root}>
      <Button variant="link" href="/login">
        Login
      </Button>
      <Button variant="link" href="/sign-up ">
        Sign up
      </Button>
    </div>
  );
};

export default Auth;
