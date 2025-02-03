import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import style from './header.module.css';
import iconRecipes from '../../images/iconeRecipes.svg';
import ProfileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import writtenLogo from '../../images/logoRecipesApp.svg';

interface HeaderProps {
  titlePage: string;
  haveSearch?: boolean;
}

function Header({ titlePage, haveSearch = false }: HeaderProps) {
  const [activeSearch, setActiveSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  // Toggle search input field
  const handleClickInput = () => {
    setActiveSearch(!activeSearch);
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setIsVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
<header className={`${style.header} ${isVisible ? style.visible : style.hidden}`}>
  <nav className={style.nav}>
    <div className={style.icons}>
      <img src={iconRecipes} alt="iconRecipes" className={style.appIcon} />
      <img src={writtenLogo} alt="writtenLogo" />
    </div>
    <h1 className={style.title} data-testid="page-title">{titlePage}</h1>
    <div className={style.filters}>
      {haveSearch && (
        <button className={style.searchBtn} onClick={handleClickInput}>
          <img data-testid="search-top-btn" src={searchIcon} alt="search" />
        </button>
      )}
      <Link to="/profile">
        <img src={ProfileIcon} data-testid="profile-top-btn" alt="profileIcon" />
      </Link>
    </div>
  </nav>
  {activeSearch && <SearchBar />}
</header>

  );
}

export default Header;
