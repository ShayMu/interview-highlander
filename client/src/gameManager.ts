import { getUserPosition } from "./geo.utils";

type setUserPosFuncType = (x:google.maps.LatLngLiteral)=>void;

class GameManager {
    updateTimeMS:number=5000;
    running:boolean=false;
    setUserPosFunc?:setUserPosFuncType;

    constructor() {

    }

    start(setUserPosFunc:setUserPosFuncType) {
        this.setUserPosFunc = setUserPosFunc;
        if (this.running) return;
        this.running = true;
        this.gameLoop();
    }

    async gameLoop() {
        if (!this.running) return;
        let userPos:google.maps.LatLngLiteral = await getUserPosition();

        if (this.setUserPosFunc) this.setUserPosFunc(userPos);
        console.log(userPos);
        setTimeout(()=>this.gameLoop(), this.updateTimeMS);
    }
}

const gameManager = new GameManager();
export default gameManager;