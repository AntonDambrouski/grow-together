import { ChangeEvent, useMemo } from 'react';
import classNames from 'classnames';
import classes from './Dropdown.module.css';

export interface DropdownOptions {
  value: string;
  content: string;
}

interface DropdownProps {
  className?: string;
  label?: string;
  options: DropdownOptions[];
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export const Dropdown = ({
  className,
  label,
  options,
  value,
  onChange,
  readOnly,
}: DropdownProps) => {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  const optionsList = useMemo(
    () =>
      options.map(({ value, content }) => (
        <option value={value} key={value}>
          {content}
        </option>
      )),
    [options]
  );

  return (
    <div className={classes.Root}>
      {label && (
        <span className={classNames(classes.label, {}, [])}>{label}</span>
      )}
      <select
        className={classNames(classes.select, {}, [className])}
        value={value}
        onChange={onChangeHandler}
        disabled={readOnly}
      >
        {optionsList}
      </select>
    </div>
  );
};
