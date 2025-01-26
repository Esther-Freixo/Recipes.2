  import { IDrinks } from "../Interfaces/drinks/IDrinks";

  export default class DrinksModel {
      
  async findAll(): Promise<IDrinks[]> {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=1');
      const data: IDrinks[] = await response.json();
      return data;
  }

  public async findById(id: string): Promise<IDrinks[]> {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: IDrinks[] = await response.json();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty or invalid JSON response');
      }
      return data;
    }

  public async findByName(name: string): Promise<IDrinks[]> {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IDrinks[] = await response.json();
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Empty or invalid JSON response');
        }    return data;
      }
  }
