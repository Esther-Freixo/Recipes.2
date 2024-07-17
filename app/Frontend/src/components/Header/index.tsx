import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../SearchBar';
import style from './header.module.css';
import iconRecipes from '../../images/iconeRecipes.svg';
import ProfileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import writtenLogo from '../../images/logoRecipesApp.svg';

// titlePage - renderiza o nome da página
// haveSearch - renderiza o icone de pesquisa dentro das páginas que deveriam
function Header({ titlePage, haveSearch = false }:
{ titlePage: string, haveSearch?: boolean }) {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);

  // Ativa e desativa o campo de busca quando clicado no icone de pesquisa
  const handleClickInput = () => {
    setActiveSearch(!activeSearch);
  };

  return (
    <header className={ style.header }>
      <nav className={ style.nav }>
        <div className={ style.icons }>
          <img src={ iconRecipes } alt="iconRecipes" className={ style.appIcon } />
          <img src={ writtenLogo } alt="writtenLogo" />
        </div>
        <div className={ style.filters }>
          {
        // Renderização condicional para páginas que não terão campo de busca
            haveSearch
            && (
              <button className={ style.searchBtn } onClick={ handleClickInput }>
                <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
              </button>)
          }
          <Link to="/profile">
            <img
              src={ ProfileIcon }
              data-testid="profile-top-btn"
              alt="profileIcon"
            />
          </Link>
        </div>
      </nav>
      <h1 className={ style.title } data-testid="page-title">{ titlePage }</h1>
      {activeSearch && <SearchBar />}
    </header>
  );
}

export default Header;
