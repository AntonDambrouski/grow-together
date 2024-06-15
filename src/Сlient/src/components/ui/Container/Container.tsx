import { ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={classnames(classes.container, className)}>{children}</div>
  );
};

export default Container;
