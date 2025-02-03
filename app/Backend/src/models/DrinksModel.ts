import axios from "axios";
import { IDrinks } from "../Interfaces/drinks/IDrinks";
import * as dotenv from 'dotenv';
dotenv.config();

export default class DrinksModel {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.API_URL || 'https:www.thecocktaildb.com/api/json/v1/1';
  }

  async findAll(): Promise<IDrinks[]> {
    const response = await axios.get(`${this.apiUrl}/search.php?s=1`);
    const data: IDrinks[] = response.data.drinks;

    if (!data) {
      throw new Error('No drinks found');
    }

    return data
  }

  public async findById(id: string): Promise<IDrinks[]> {
    const response = await axios.get(`${this.apiUrl}/lookup.php?i=${id}`);

    const data: IDrinks[] = await response.data.drinks;
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Empty or invalid JSON response');
    }
    return data;
  }

  public async findByName(name: string): Promise<IDrinks[]> {
    const response = await axios.get(`${this.apiUrl}/search.php?s=${name}`);

    const data: IDrinks[] = await response.data.drinks;
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Empty or invalid JSON response');
    } return data;
  }

  public async findByCategory(category: string): Promise<IDrinks[]> {
    const response = await axios.get(`${this.apiUrl}/filter.php?c=${category}`);

    const data: IDrinks[] = await response.data.drinks;
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Empty or invalid JSON response');
    } return data || [];
  }
}
