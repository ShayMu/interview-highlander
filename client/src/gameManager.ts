import { getUserPosition } from "./geo.utils";
import { apiReq } from "./network.util";

type setPosFuncType = (x:google.maps.LatLngLiteral)=>void;
type setGameOverFuncType = (x:boolean)=>void;

class GameManager {
    updateTimeMS:number=5000;
    running:boolean=false;
    goalPos?: google.maps.LatLngLiteral;
    successRadiusKM:number = 0.5;
    setUserPosFunc?:setPosFuncType;
    setGoalPosFunc?:setPosFuncType
    setGameOverFunc?:setGameOverFuncType

    constructor() {

    }

    async start(setUserPosFunc:setPosFuncType, setGoalPosFunc:setPosFuncType, setGameOverFunc:setGameOverFuncType) {
        this.setUserPosFunc = setUserPosFunc;
        this.setGameOverFunc = setGameOverFunc;
        this.setGoalPosFunc = setGoalPosFunc;
        if (this.running) return;
        this.running = true;
        const userPos = await getUserPosition();
        const goalPos = await apiReq('/game/new', {
            longitude: userPos.lng,
            latitude: userPos.lat
        });

        this.goalPos = {lat: goalPos.lat, lng: goalPos.lng};
        this.setGoalPosFunc(this.goalPos);
        this.setGameOverFunc(false);
        this.gameLoop();
    }

    restart() {
        if (!this.setUserPosFunc || !this.setGoalPosFunc || !this.setGameOverFunc) return;
        this.start(this.setUserPosFunc, this.setGoalPosFunc, this.setGameOverFunc);
    }

    async gameLoop() {
        if (!this.running) return;
        let userPos:google.maps.LatLngLiteral = await getUserPosition();

        if (this.setUserPosFunc) this.setUserPosFunc(userPos);
        
        const isGoal = await apiReq('/game/status', {ballPos: userPos, goalPos: this.goalPos, succRadius: this.successRadiusKM}, 'POST');
        if (isGoal) this.gameOver();
        else setTimeout(()=>this.gameLoop(), this.updateTimeMS);
    }

    gameOver() {
        this.running = false;
        if (this.setGameOverFunc) this.setGameOverFunc(true);
        this.restart();
    }
}

const gameManager = new GameManager();
export default gameManager;