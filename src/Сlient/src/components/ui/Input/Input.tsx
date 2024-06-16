import classNames from 'classnames';
import classes from './Input.module.css';
import { ChangeEvent, memo } from 'react';

interface InputProps {
  className?: string;
  id: string;
  type?: string;
  onChange?: (value: string) => void;
  label?: string;
  value?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}
const Input = ({
  className,
  id,
  type = 'text',
  placeholder,
  onChange,
  value = '',
  label,
  readOnly,
  fullWidth,
  ...props
}: InputProps) => {
  const modes = {
    [classes.readOnly]: readOnly,
    [classes.fullWidth]: fullWidth,
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const inputWithLabel = (
    <label className={classes.label} htmlFor={id}>
      {label}
      <input
        {...props}
        className={classNames(classes.input, modes, [])}
        type={type}
        id={id}
        onChange={onChangeHandler}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </label>
  );

  const inputWithoutLabel = (
    <input
      {...props}
      className={classNames(classes.input, modes, [])}
      type={type}
      id={id}
      onChange={onChangeHandler}
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );

  return (
    <div className={classes.Root}>
      {label ? inputWithLabel : inputWithoutLabel}
    </div>
  );
};

export default memo(Input);
