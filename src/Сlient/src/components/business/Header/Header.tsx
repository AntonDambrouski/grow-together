import Auth from '../Auth/Auth';
import Container from '../../ui/Container/Container';
import Logo from '../../ui/Logo/Logo';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.wrapper}>
          <Link href="/">
            <Logo />
          </Link>
          <Auth />
        </div>
      </Container>
      <Navbar />
    </header>
  );
};

export default Header;
