import { Router, Request, Response } from 'express';
import MealsController from '../controllers/MealsController';

const router = Router();
const mealsController = new MealsController();

router.get('/meals', (req: Request, res: Response) => mealsController.getAllMeals(req, res));
router.get('/meals/:id', (req, res) => mealsController.getMealById(req, res));
router.get('/meals/:name', (req, res) => mealsController.getMealById(req, res));

export default router;
