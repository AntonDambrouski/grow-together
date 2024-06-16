import React, { ReactNode } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import styles from './SwipeCard.module.css';

interface SwipeCardProps {
  children: ReactNode;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
  style?: React.CSSProperties;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ children, onSwipedUp, onSwipedDown, style }) => {
  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedUp: () => {
      if (onSwipedUp) {
        onSwipedUp();
      }
    },
    onSwipedDown: () => {
      if (onSwipedDown) {
        onSwipedDown();
      }
    },
    trackMouse: true,
  });

  return (
    <div {...handlers} className={styles.swipeCard} style={style}>
      {children}
    </div>
  );
};

export default SwipeCard;
