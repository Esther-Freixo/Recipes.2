import styles from "./recipes.module.css";

type RecipesProps = {
  index: number;
  id: string;
  name: string;
  image: string;
  category: string;
  type: string;
  area?: string;
  alcoholic?: string;
};

function Recipes({ index, id, name, image, type, category, area, alcoholic }: RecipesProps) {
  return (
    <div className={ styles.recipeContainer }>
      <div data-testid={`${index}-recipe-card`} className={styles.recipeCard}>
        <img
          src={image}
          alt={name}
          data-testid={`${index}-card-img`}
          className={styles.image}
        />
        <div className={styles.cardInfo}>
          <div className={styles.cardSubInfo}>
            <p>{category}</p>
            {type === 'comidas' ? <p>{area}</p> : alcoholic === "Non-alcoholic" && <p>{alcoholic}</p>}
          </div>
          <div className={ styles.title }>
            <p data-testid={`${index}-card-name`} >{name}</p>
          </div>
        </div>
      </div>
   </div>
  );  
}  
  
export default Recipes;
