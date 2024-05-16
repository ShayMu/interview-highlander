import * as turf from '@turf/turf';

class GameController {
    goalInitRadius:number = 1; // radius in km to create the starting position of the goal

    newGame(longitude:number, latitude: number):[number, number] {
        const centerPoint = turf.point([longitude, latitude]);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * this.goalInitRadius;
        const newPoint = turf.transformTranslate(centerPoint, distance, angle, { units: 'kilometers' });
        const [lon, lat] = turf.getCoords(newPoint);

        return [lon, lat];
    }

    checkGoal(ballPos:[number, number], goalPos: [number, number], successRadius: number):boolean {
        const distance:number = turf.distance(ballPos, goalPos, { units: 'kilometers' });
        return distance <= successRadius;
    }
}

const gameController = new GameController();
export default gameController;