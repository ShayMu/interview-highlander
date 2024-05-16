import React, { createContext, useState, ReactElement, useEffect } from "react";
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Map from "./map.component";
import { getUserPosition } from "./geo.utils";
import GameManager from "./gameManager";

export type AppContextType = {
  userPos: google.maps.LatLngLiteral
  setUserPos: (x:google.maps.LatLngLiteral)=>void,
  goalPos: google.maps.LatLngLiteral
  setGoalPos: (x:google.maps.LatLngLiteral)=>void,
};

export const AppContext = createContext<AppContextType>({ 
  userPos: {lng: 0, lat: 0}, 
  setUserPos: (x:google.maps.LatLngLiteral)=>{},
  goalPos: {lng: 0, lat: 0}, 
  setGoalPos: (x:google.maps.LatLngLiteral)=>{}
});


const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <div>Done!</div>;
};

function App() {
  const [userPos, setUserPos] = useState({lng: 0, lat: 0});
  const [goalPos, setGoalPos] = useState({lng: 0, lat: 0});

  useEffect(()=>{ GameManager.start(setUserPos); }, []);

  return (
    <div style={{width: '100%', height: '100%', backgroundColor: 'green'}}>
      <AppContext.Provider value={{userPos, setUserPos, goalPos, setGoalPos}}>
        <Wrapper apiKey="AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI" render={render}>
          <Map />
        </Wrapper>
      </AppContext.Provider>
    </div>
  );
}

export default App;