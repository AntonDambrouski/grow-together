import Input from '@/components/ui/Input/Input';
import classes from './ProjectsHeading.module.css';
import Button from '@/components/ui/Button/Button';
import { Dropdown, DropdownOptions } from '@/components/ui/Dropdown/Dropdown';
import { useCallback, useState } from 'react';

const mockValues: DropdownOptions[] = [
  {
    content: '111',
    value: '111',
  },
  {
    content: '222',
    value: '222',
  },
  {
    content: '333',
    value: '333',
  },
];

const ProjectsHeading = () => {
  const [searchValue, setSearchValue] = useState('');

  const onChange = useCallback((newValue: string) => {
    setSearchValue(newValue);
  }, []);

  return (
    <div className={classes.Root}>
      <h1>Projects</h1>
      <div className={classes.filters}>
        <Dropdown options={mockValues} />
        <Input
          id="search"
          placeholder="Search"
          onChange={onChange}
          value={searchValue}
        />
        <Button>Create new project</Button>
      </div>
    </div>
  );
};

export default ProjectsHeading;
