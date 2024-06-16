import { memo } from 'react';
import Button from '../Button/Button';
import classes from './Card.module.css';

const Card = () => {
  return (
    <div className={classes.Root}>
      <h2>Title</h2>
      <p>Paragraph</p>
      <Button>View</Button>
    </div>
  );
};

export default memo(Card);
