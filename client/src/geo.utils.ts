export async function getUserPosition() {
  return new Promise<google.maps.LatLngLiteral>(resolve=>{
    const userPos: google.maps.LatLngLiteral = {lat: 0, lng: 0};
    if (navigator.geolocation) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Position object contains the user's latitude and longitude
          const { latitude, longitude } = position.coords;
            userPos.lat = latitude;
            userPos.lng = longitude;
            resolve(userPos);
        },
        (error) => {
          // Handle any errors that occur while retrieving the user's position
          console.error("Error getting user's position:", error.message);
          resolve(userPos);
        }
      );
    } else {
      // Geolocation is not supported in the browser
      console.error("Geolocation is not supported in this browser");
      resolve(userPos);
    }
  });
}