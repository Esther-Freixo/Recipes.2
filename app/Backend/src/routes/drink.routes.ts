import { Router, Request, Response } from 'express';
import DrinksController from '../controllers/DrinksController';

const router = Router();
const drinksController = new DrinksController();

router.get('/', (req: Request, res: Response) => drinksController.getAlldrinks(req, res));
router.get('/:id', (req, res) => drinksController.getMealById(req, res));
// router.get('/drinks/:name', (req, res) => drinksController.getMealByName(req, res));

export default router;
