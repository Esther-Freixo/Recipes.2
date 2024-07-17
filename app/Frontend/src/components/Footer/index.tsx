import { NavLink } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './style.module.css';

function Footer() {
  return (
    <div className={ styles.footer } data-testid="footer">
      <NavLink to="/drinks">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </NavLink>
      <NavLink to="/meals">
        <img src={ mealIcon } alt="Meal Icon" data-testid="meals-bottom-btn" />
      </NavLink>

    </div>
  );
}

export default Footer;
