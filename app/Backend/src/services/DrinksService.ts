import DrinksModel from "../models/DrinksModel";
import { IDrinks } from "../Interfaces/drinks/IDrinks";
import { ServiceResponse } from "../Interfaces/ServiceResponse";

export default class drinksService {
  constructor(private drinksModel = new DrinksModel()) {}

  public async findAll(): Promise<ServiceResponse<IDrinks[]>> {
    const alldrinks = await this.drinksModel.findAll();
    return { status: 'SUCCESSFUL', data: alldrinks };
  }

  public async findById(id: string): Promise<ServiceResponse<IDrinks[]>> {
    try {
      const drink = await this.drinksModel.findById(id);
      return { status: 'SUCCESSFUL', data: drink };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in Service:', error.message);
      } else {
        console.error('Unknown error in Service:', error);
      }
      return { status: 'NOT_FOUND', data: { message: 'Drink not found' } };
    }
  }
  

  public async findByName(name: string): Promise<ServiceResponse<IDrinks[]>> {
    const drink = await this.drinksModel.findByName(name);
    return { status: 'SUCCESSFUL', data: drink };
  }
}