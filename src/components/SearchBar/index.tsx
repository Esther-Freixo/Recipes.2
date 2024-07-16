import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchContext from '../../context/SearchContext';
import style from './serachBar.module.css';

function SearchBar() {
  const { searchInput, setApiData, apiData, setSearchInput } = useContext(SearchContext);
  const [radioFilter, setRadioFilter] = useState<any>('');
  const location = useLocation();
  const navigate = useNavigate();

  // Busca as receitas conforme o filtro selecionado e o input digitado no campo de busca
  const fetchApi = async () => {
    let endpoint = '';
    const { pathname } = location;

    switch (radioFilter) {
      case 'ingredient':
        endpoint = `https://www.${pathname === '/meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/filter.php?i=${searchInput}`;
        break;
      case 'name':
        endpoint = `https://www.${pathname === '/meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=${searchInput}`;
        break;
      case 'firstLetter':
        if (searchInput.length !== 1) {
          window.alert('Your search must have only 1 (one) character');
          return;
        }
        endpoint = `https://www.${pathname === '/meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?f=${searchInput}`;
        break;
      default:
        return;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    if (!data.meals && !data.drinks) {
      setApiData(null);
    } else {
      setApiData(data.meals || data.drinks);
    }
  };

  // Emite alerta caso nenhuma receita seja encontrada
  useEffect(() => {
    if (!apiData || apiData.length === 0) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    } else if (apiData && apiData.length === 1) {
      const { idMeal, idDrink } = apiData[0];
      if (idMeal) {
        navigate(`/meals/${idMeal}`);
      } else {
        navigate(`/drinks/${idDrink}`);
      }
    }
  }, [apiData, navigate]);

  // Captura o input digitado e atualiza no estado global SearchProvider
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={ style.conteiner }>
      <div className={ style.searchConteiner }>
        <input
          type="text"
          placeholder="Search"
          className={ style.input }
          data-testid="search-input"
          id="inputBar"
          value={ searchInput }
          onChange={ handleChange }
        />
        <div className={ style.filtersBtn }>
          <label className={ style.labels } htmlFor="ingredient-radio">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="search-radio"
              id="ingredient-radio"
              value="ingredient"
              onClick={ () => setRadioFilter('ingredient') }
            />
            Ingredient
          </label>

          <label className={ style.labels } htmlFor="name-radio">
            <input
              type="radio"
              data-testid="name-search-radio"
              name="search-radio"
              id="name-radio"
              value="name"
              onClick={ () => setRadioFilter('name') }
            />
            Name
          </label>

          <label className={ style.labels } htmlFor="first-letter-radio">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="search-radio"
              id="first-letter-radio"
              value="firstLetter"
              onClick={ () => setRadioFilter('firstLetter') }
            />
            First letter
          </label>
        </div>

        <button
          className={ style.btnSearch }
          data-testid="exec-search-btn"
          onClick={ () => fetchApi() }
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}
export default SearchBar;
