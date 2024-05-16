import React, { createContext, useState, ReactElement, useEffect } from "react";
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Map from "./map.component";
import { getUserPosition } from "./geo.utils";
import GameManager from "./gameManager";
import Fireworks from "./fireworks.component";

export type AppContextType = {
  userPos: google.maps.LatLngLiteral;
  goalPos: google.maps.LatLngLiteral;
  isGameOver: boolean;
};

export const AppContext = createContext<AppContextType>({ 
  userPos: {lng: 0, lat: 0}, 
  goalPos: {lng: 0, lat: 0},
  isGameOver: false
});


const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <div>Done!</div>;
};

function App() {
  const [userPos, setUserPos] = useState({lng: 0, lat: 0});
  const [goalPos, setGoalPos] = useState({lng: 0, lat: 0});
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(()=>{ GameManager.start(setUserPos, setGoalPos, setIsGameOver); }, []);

  return (
    <div style={{width: '100%', height: '100%', backgroundColor: 'green'}}>
      <AppContext.Provider value={{isGameOver, userPos, goalPos}}>
        <Wrapper apiKey="AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI" render={render}>
          <Map />
        </Wrapper>
        <Fireworks />
      </AppContext.Provider>
    </div>
  );
}

export default App;