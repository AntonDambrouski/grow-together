import { FormEvent, ReactNode } from 'react';
import classNames from 'classnames';
import classes from './Form.module.css';

interface FormProps {
  className?: string;
  onSubmit: () => void;
  children: ReactNode;
}

const Form = ({ children, onSubmit, className }: FormProps) => {
  return (
    <form className={classNames(classes.Root, className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
