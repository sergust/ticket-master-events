import { useState, forwardRef, type ForwardedRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ngeohash from "ngeohash";

interface LocationPickerProps {
  onChange: (location: Location) => void;
}

/**
 * LocationPicker component for selecting a location on a map.
 * @param onChange - Callback function triggered when a location is selected.
 * @param ref - Reference to the component.
 * @returns JSX.Element - The rendered LocationPicker component.
 */
const LocationPicker = forwardRef(
  ({ onChange }: LocationPickerProps, ref: ForwardedRef<unknown>) => {
    const [position, setPosition] = useState(null);

    /**
     * MapEvents component for handling map events.
     * @returns null
     */
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
      <MapContainer
        center={[45.4, -75.7]}
        zoom={13}
        className="z-0 h-96 w-full"
        ref={ref}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && <Marker position={position}></Marker>}
        <MapEvents />
      </MapContainer>
    );
  },
);

LocationPicker.displayName = "LocationPicker";

export default LocationPicker;
