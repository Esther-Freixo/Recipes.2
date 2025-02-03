import { Router, Request, Response } from 'express';
import DrinksController from '../controllers/DrinksController';

const router = Router();
const drinksController = new DrinksController();

router.get('/', (req: Request, res: Response) => drinksController.getAlldrinks(req, res));
router.get('/:id', (req: Request, res: Response) => drinksController.getDrinkById(req, res));
router.get('/name/:name', (req: Request, res: Response) => drinksController.getDrinkByName(req, res));
router.get('/category/:category', (req: Request, res: Response) => drinksController.getDrinkByCategory(req, res));

export default router;
