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
    const meal = await this.drinksModel.findById(id);
    return { status: 'SUCCESSFUL', data: meal };
  }

  public async findByName(name: string): Promise<ServiceResponse<IDrinks[]>> {
    const meal = await this.drinksModel.findByName(name);
    return { status: 'SUCCESSFUL', data: meal };
  }
}