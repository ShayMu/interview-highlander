import { Router, Request, Response } from 'express';
import gameController, { LatLngType } from './game.controller';

const router = Router();

router.get('/game/new', (req: Request, res: Response) => {
    if (!req.query || !req.query.longitude || !req.query.latitude) return res.sendStatus(400);
    const goalPoint:LatLngType = gameController.newGame({lng: Number(req.query.longitude), lat: Number(req.query.latitude)});
    res.json(goalPoint);
});

router.post('/game/status', (req: Request, res: Response) => {
    if (!req.body || !req.body.ballPos || !req.body.goalPos || !req.body.succRadius) return res.sendStatus(400);
    const isGoal:boolean = gameController.checkGoal(req.body.ballPos, req.body.goalPos, req.body.succRadius);
    res.json(isGoal)
});

export default router;