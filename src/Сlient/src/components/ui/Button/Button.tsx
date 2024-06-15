import { ReactNode } from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className={classes.button} type="button">
      {children}
    </button>
  );
};

export default Button;
