type RecipesProps = {
  index: number;
  id: string;
  name: string;
  image: string;
  // category: string;
  // area?: string;
  type: string;
};

function Recipes(meal: RecipesProps) {
  // aqui tem que fazer um if pra ver se é drinks ou meals
  const { index, id, name, image, type } = meal;

  if (type === 'comidas') {
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{name}</p>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
          width="200px"
        />
        {/* <p data-testid={ `${index}-card-category` }>{category}</p> */}
        {/* <p data-testid={ `${index}-card-area` }>{area}</p> */}
        <p data-testid={ `${index}-card-id` }>{id}</p>
      </div>
    );
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
        width="200px"
      />
      {/* <p data-testid={ `${index}-card-category` }>{category}</p> */}
      <p data-testid={ `${index}-card-id` }>{id}</p>

    </div>
  );
}

export default Recipes;
