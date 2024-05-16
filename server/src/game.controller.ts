import * as turf from '@turf/turf';

export type LatLngType = {
    lat: number,
    lng: number
}

class GameController {
    goalInitRadius:number = 1; // radius in km to create the starting position of the goal

    newGame(pos:LatLngType):LatLngType {
        const centerPoint = turf.point([pos.lng, pos.lat]);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * this.goalInitRadius;
        const newPoint = turf.transformTranslate(centerPoint, distance, angle, { units: 'kilometers' });
        const [lng, lat] = turf.getCoords(newPoint);

        return {lng, lat};
    }

    checkGoal(ballPos:LatLngType, goalPos: LatLngType, successRadius: number):boolean {
        const distance:number = turf.distance([ballPos.lng, ballPos.lat], [goalPos.lng, goalPos.lat], { units: 'kilometers' });
        return distance <= successRadius;
    }
}

const gameController = new GameController();
export default gameController;