import { useEffect, useState } from 'react';
import SwipeCard from '../SwipeCard/SwipeCard';
import { useSpring, animated, config } from '@react-spring/web';
import classes from './SwipeCards.module.css';
import Button from '@/components/ui/Button/Button';
import { useGlobalState } from '@/GlobalStateContext';

interface Project {
  id: number;
  title: string;
  description: string;
  isAIGenerated: boolean;
}

interface SwipeCardsProps {}

const SwipeCards = ({}: SwipeCardsProps) => {
  const { isLoggedIn } = useGlobalState();
  const [cards, setCards] = useState<Project[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [prevCards, setPrevCards] = useState<Project[]>([]);
  const [currentCard, setCurrentCard] = useState<Project | null>(null);
  const [nextCard, setNextCard] = useState<Project | null>(null);

  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://grow-together.azurewebsites.net/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Project[] = await response.json();
        setCards(data);
        setFetchError(false); 
        if (data.length > 0) {
          setCurrentCard(data[0]);
          setNextCard(data.length > 1 ? data[1] : null);
        }
      } catch (error) {
        const mockProjects = [
          {
            id: 1,
            title: 'Mock Project 1',
            description: 'This is the description for Mock Project 1.',
            isAIGenerated: false,
          },
          {
            id: 2,
            title: 'Mock Project 2',
            description: 'This is the description for Mock Project 2.',
            isAIGenerated: true,
          },
          {
            id: 3,
            title: 'Mock Project 3',
            description: 'This is the description for Mock Project 3.',
            isAIGenerated: false,
          },
        ];
        setCards(mockProjects);
        setFetchError(true);
        if (mockProjects.length > 0) {
          setCurrentCard(mockProjects[0]);
          setNextCard(mockProjects.length > 1 ? mockProjects[1] : null);
        }
      }
    };

    fetchCards();
  }, []);

  const handleSwipedUp = () => {
    if (currentCard && nextCard) {
      setPrevCards((prev) => [currentCard, ...prev]);
      api.start({
        y: -window.innerHeight,
        config: config.stiff,
        onRest: () => {
          setCurrentCard(nextCard);
          const remainingCards = cards.slice(1);
          setNextCard(remainingCards.length > 1 ? remainingCards[1] : null);
          setCards(remainingCards);
          api.set({ y: 0 });
        },
      });
    } else if (currentCard) {
      api.start({
        y: -window.innerHeight,
        config: config.stiff,
        onRest: () => {
          api.set({ y: 0 });
        },
      });
    }
  };

  const handleSwipedDown = () => {
    if (prevCards.length > 0) {
      const newCurrentCard = prevCards[0];
      const newNextCard = currentCard;
      setPrevCards((prev) => prev.slice(1));
      setCards((prev) => [newCurrentCard, ...prev]);
      api.start({
        y: window.innerHeight,
        config: config.stiff,
        onRest: () => {
          setCurrentCard(newCurrentCard);
          setNextCard(newNextCard);
          api.set({ y: 0 });
        },
      });
    }
  };

  return (
    <div className={classes.app}>
      {fetchError && cards.length === 0 && <div style={{ color: 'red' }}>Failed to fetch cards</div>}
      {currentCard !== null && (
        <animated.div
          style={{ transform: y.to((y) => `translateY(${y}px)`) }}
          className={classes.cardContainer}
        >
          <SwipeCard
            onSwipedUp={handleSwipedUp}
            onSwipedDown={handleSwipedDown}
          >
            <div>
              {!isLoggedIn && (
                <Button
                  className={classes.loginButton}
                  variant="link"
                  href="/login"
                >
                  Login
                </Button>
              )}
            </div>
            <div className={classes.wrapper}>
              <h1 className={classes.title}>{currentCard.title}</h1>
              <p className={classes.text}>{currentCard.description}</p>
            </div>
          </SwipeCard>
        </animated.div>
      )}
      {nextCard !== null && (
        <animated.div
          style={{
            transform: y.to((y) => `translateY(${y + window.innerHeight}px)`),
          }}
          className={classes.cardContainer}
        >
          <SwipeCard
            onSwipedUp={handleSwipedUp}
            onSwipedDown={handleSwipedDown}
          >
            <div className={classes.wrapper}>
              <h1 className={classes.title}>{nextCard.title}</h1>
              <p className={classes.text}>{nextCard.description}</p>
            </div>
          </SwipeCard>
        </animated.div>
      )}
      {currentCard === null && <h1>No more cards</h1>}
    </div>
  );
};

export default SwipeCards;
