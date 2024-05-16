import { Router, Request, Response } from 'express';
import gameController from './game.controller';

const router = Router();

router.get('/game/new', (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body || !req.body.longitude || !req.body.latitude) return res.sendStatus(400);
    const goalPoint:[number, number] = gameController.newGame(req.body.longitude, req.body.latitude);
    res.json(goalPoint);
});

router.get('/game/status', (req: Request, res: Response) => {
    const isGoal:boolean = gameController.checkGoal(req.body.ballPos, req.body.goalPos, req.body.succRadius);
    res.json(isGoal)
});

export default router;