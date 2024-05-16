import { useRef, useEffect, useContext } from "react";
import { AppContext, AppContextType } from './App';
import ballImgSrc from './res/ball.png';
import goalImgSrc from './res/goal.png';

type MarkersType = {
    userMarker?: any,
    goalMarker?: any
}

let _map:any= null;
let markers:MarkersType = {};

async function initMap(htmlRef:HTMLDivElement, mapCenter:google.maps.LatLngLiteral) {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    _map = new Map(htmlRef, {
        center: mapCenter,
        zoom: 15,
        mapId: 'highlander-interview'
    });

    updateUserMarker(mapCenter);
}

async function updateUserMarker(pos: google.maps.LatLngLiteral) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    if (markers.userMarker) markers.userMarker.position = pos;  
    else {
        const ballImg = document.createElement('img');
        ballImg.src = ballImgSrc;
        ballImg.width = 30;
        ballImg.height = 30;
        markers.userMarker = new AdvancedMarkerElement({
            position: pos,
            map: _map,
            content: ballImg,
        });
    }
}

async function updateGoalMarker(pos:google.maps.LatLngLiteral) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    if (markers.goalMarker) markers.goalMarker.position = pos;  
    else {
        const goalImg = document.createElement('img');
        goalImg.src = goalImgSrc;
        goalImg.height = 100;
        goalImg.width = 200;
        markers.goalMarker = new AdvancedMarkerElement({
            position: pos,
            map: _map,
            content: goalImg
        });
    }
}


function Map() {
    const ref = useRef<HTMLDivElement>(null);
    const {userPos, goalPos} = useContext<AppContextType>(AppContext);


    useEffect(() => {
        if (!ref.current) return;
        if (!_map) initMap(ref.current, userPos);
        else {
            updateGoalMarker(goalPos);
            updateUserMarker(userPos);
            _map.panTo(userPos);
        }
    }, [userPos, goalPos]);
  
    return <div ref={ref} style={{height: '1000px', width: '100%'}} id="map" />;
  }

  export default Map;