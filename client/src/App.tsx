import React, { createContext, useState, ReactElement } from "react";
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Map from "./map.component";
import Game from "./game.component";
import { getUserPosition } from "./geo.utils";

export type AppContextType = {
  mapCenter: google.maps.LatLngLiteral
  setMapCenter: (x:google.maps.LatLngLiteral)=>void
};


export const AppContext = createContext<AppContextType>({ 
  mapCenter: {lng: 0, lat: 0}, 
  setMapCenter: (x:google.maps.LatLngLiteral)=>{}
});


const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <div>Done!</div>;
};

function App() {
  const [mapCenter, setMapCenter] = useState(getUserPosition());

  return (
    <div style={{width: '100%', height: '100%', backgroundColor: 'green'}}>
      <AppContext.Provider value={{mapCenter, setMapCenter}}>
        <Wrapper apiKey="AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI" render={render}>
          <Map />
        </Wrapper>
        <Game />
      </AppContext.Provider>
    </div>
  );
}

export default App;