import { useRef, useEffect, useContext } from "react";
import { AppContext, AppContextType } from './App';

function Map() {
    const ref = useRef<HTMLDivElement>(null);
    const {mapCenter} = useContext<AppContextType>(AppContext);


    useEffect(() => {
        if (!ref.current) return;
        new window.google.maps.Map(ref.current, {
            center: mapCenter,
            zoom: 10,
        });
    });
  
    return <div ref={ref} style={{height: '1000px', width: '100%'}} id="map" />;
  }

  export default Map;