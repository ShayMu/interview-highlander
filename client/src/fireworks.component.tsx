import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import './fireworks.component.css';

function Fireworks () {
    const {isGameOver} = useContext(AppContext);

    useEffect(()=>{
        if (isGameOver) {
            const fireworks = document.querySelectorAll('.firework');
            fireworks.forEach(firework => {
                firework.classList.remove('active'); // Reset animation
                // Force reflow to restart the animation
                // void firework.offsetWidth;
                firework.classList.add('active');
            });
        }
    }, [isGameOver]);

    return <div>
        <div className="firework" id="firework1"></div>
        <div className="firework" id="firework2"></div>
        <div className="firework" id="firework3"></div>
        <div className="firework" id="firework4"></div>
        <div className="firework" id="firework5"></div>
        <div className="firework" id="firework6"></div>
        <div className="firework" id="firework7"></div>
        <div className="firework" id="firework8"></div>
        <div className="firework" id="firework9"></div>
        <div className="firework" id="firework10"></div>
        <div className="firework" id="firework11"></div>
        <div className="firework" id="firework12"></div>
        <div className="firework" id="firework13"></div>
        <div className="firework" id="firework14"></div>
    </div>;
}


export default Fireworks;
