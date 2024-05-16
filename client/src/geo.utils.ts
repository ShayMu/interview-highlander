export function getUserPosition() {
    const userPos: google.maps.LatLngLiteral = {lat: 0, lng: 0};
    if (navigator.geolocation) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Position object contains the user's latitude and longitude
          const { latitude, longitude } = position.coords;
            userPos.lat = latitude;
            userPos.lng = longitude;
        },
        (error) => {
          // Handle any errors that occur while retrieving the user's position
          console.error("Error getting user's position:", error.message);
        }
      );
    } else {
      // Geolocation is not supported in the browser
      console.error("Geolocation is not supported in this browser");
    }

    return userPos;
}