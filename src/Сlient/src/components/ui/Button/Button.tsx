import { ReactNode } from 'react';
import classNames from 'classnames';
import classes from './Button.module.css';
import Link from 'next/link';

type ButtonVariant = 'button' | 'link';
type ButtonType = 'button' | 'submit';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: ButtonType;
  onClick?: () => void;
}

const Button = ({
  children,
  type = 'button',
  variant = 'button',
  href,
  className,
  onClick,
}: ButtonProps) => {
  if (variant === 'link' && href) {
    return (
      <Link
        className={classNames(classes.link, className)}
        onClick={onClick}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames(classes.button, className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
