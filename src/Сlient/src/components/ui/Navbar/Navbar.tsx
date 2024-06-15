import Container from '../Container/Container';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <Container>
        <ul className={classes.list}>
          <li className={classes.item}>
            <a className={classes.link} href="#">
              Category 1
            </a>
          </li>
          <li className={classes.item}>
            <a className={classes.link} href="#">
              Category 2
            </a>
          </li>
          <li className={classes.item}>
            <a className={classes.link} href="#">
              Category 3
            </a>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
