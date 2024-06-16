import Link from 'next/link';
import Container from '../../ui/Container/Container';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <Container>
        <ul className={classes.list}>
          <li className={classes.item}>
            <Link className={classes.link} href="/projects">
              Projects
            </Link>
          </li>
          <li className={classes.item}>
            <Link className={classes.link} href="/people">
              People
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
