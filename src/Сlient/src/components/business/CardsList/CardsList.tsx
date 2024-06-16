import Card from '@/components/ui/Card/Card';
import classes from './CardsList.module.css';

const mockCards = [1, 2, 3, 4, 5, 6, 7, 8];

const CardsList = () => {
  return (
    <div className={classes.Root}>
      {mockCards.map((card) => {
        return <Card key={card} />;
      })}
    </div>
  );
};

export default CardsList;
