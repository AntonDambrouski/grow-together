import Auth from '../../business/Auth/Auth';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.wrapper}>
          <Logo />
          <Auth />
        </div>
      </Container>
      <Navbar />
    </header>
  );
};

export default Header;
