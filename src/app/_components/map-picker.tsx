import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ngeohash from "ngeohash";

const LocationPicker = ({
  onChange,
}: {
  onChange: (location: Location) => void;
}) => {
  const [position, setPosition] = useState(null);

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        const geohash = ngeohash.encode(lat, lng);
        onChange(geohash);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[45.4, -75.7]} zoom={13} className="h-96 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && <Marker position={position}></Marker>}
      <MapEvents />
    </MapContainer>
  );
};

export default LocationPicker;
