import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const fetchLocation = async (location) => {
  const queryLocation = location.replaceAll(" ", "%20").replaceAll(",", "%2C");

  const result = await axios.get(
    `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${queryLocation}&format=json`,
  );
  const longitude = result.data[0].lon;
  const latitude = result.data[0].lat;

  return { latitude, longitude };
};

export default function DisplayedMap({ location }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (location) {
      const getLocation = async () => {
        const locationResult = await fetchLocation(location);
        setCoordinates(locationResult);
      };
      getLocation();
    }
  }, [location]);

  useEffect(() => {
    if (coordinates !== null) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${API_KEY}`,
        zoom: 12,
        center: [coordinates.longitude, coordinates.latitude],
      });
      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(map.current);
    }
  }, [coordinates]);

  return (
    <div className= "relative h-72 w-full border border-black">
      <div ref={mapContainer} className="absolute h-full w-full z-0" />
    </div>
  );
}
