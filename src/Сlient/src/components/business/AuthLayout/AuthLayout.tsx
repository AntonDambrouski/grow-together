import { ReactNode } from 'react';
import classes from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className={classes.Root}>{children}</div>;
};

export default AuthLayout;
