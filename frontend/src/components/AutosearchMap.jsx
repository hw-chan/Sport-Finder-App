import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function AutosearchMap({ register, setValue }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 139.753;
  const lat = 35.6844;
  const zoom = 10;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    const geocoder = new window.MapboxGeocoder({
      accessToken: API_KEY,
      mapboxgl: maplibregl,
      limit: 5,
      dedupe: 1,
      marker: {
        color: "red",
      },
      flyTo: {
        screenSpeed: 7,
        speed: 4,
      },
    });

    geocoder.on("result", (e) => {
      const result = e.result;
      const location = {
        name: result.display_name || result.place_name,
        lat: result.lat || result.center[1],
        lon: result.lon || result.center[0],
      };
      setSelectedLocation(location);
      setValue("location", location.name);
    });

    register("location", {
      required: true,
    });

    map.current.addControl(geocoder, "top-left");
  }, [selectedLocation, register, setValue]);

  return (
    <div className="relative h-72 w-full border border-black z-0 desktop:w-[50%]">
      <div ref={mapContainer} className="absolute h-full w-full" />
    </div>
  );
}
