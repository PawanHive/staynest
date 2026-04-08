const mapContainer = document.getElementById("map");

if (
  mapContainer &&
  typeof maptilersdk !== "undefined" &&
  typeof mapToken !== "undefined"
) {
  maptilersdk.config.apiKey = mapToken;

  if (Array.isArray(coordinates) && coordinates.length === 2) {
    // If coordinates exist, create map directly
    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center: coordinates,
      zoom: 9,
    });
    new maptilersdk.Marker({ color: "#fe424d" })
      .setLngLat(coordinates)
      .addTo(map);
  } else {
    // Geocode the location using Nominatim (OpenStreetMap)
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listingLocation)}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const coords = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
          const map = new maptilersdk.Map({
            container: "map",
            style: maptilersdk.MapStyle.STREETS,
            center: coords,
            zoom: 9,
          });
          new maptilersdk.Marker({ color: "#fe424d" })
            .setLngLat(coords)
            .addTo(map);
        } else {
          // No results, use default map
          const map = new maptilersdk.Map({
            container: "map",
            style: maptilersdk.MapStyle.STREETS,
            center: [0, 0],
            zoom: 2,
          });
        }
      })
      .catch((error) => {
        console.error("Geocoding failed:", error);
        // Use default map
        const map = new maptilersdk.Map({
          container: "map",
          style: maptilersdk.MapStyle.STREETS,
          center: [0, 0],
          zoom: 2,
        });
      });
  }
}

// console.log("Coordinates:", coordinates);
// console.log("Listing Location:", listingLocation);
