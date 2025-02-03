import { Request, Response } from 'express';
import DrinksService from '../services/DrinksService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class drinksController {
  constructor(private drinksService = new DrinksService()) {}

  public async getAlldrinks(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.drinksService.findAll();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getDrinkById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.drinksService.findById(id);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getDrinkByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const serviceResponse = await this.drinksService.findByName(name);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getDrinkByCategory(req: Request, res: Response): Promise<Response> {
    const { category } = req.params;
    const serviceResponse = await this.drinksService.findByCategory(category);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
