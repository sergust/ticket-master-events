"use client";
import dynamic from "next/dynamic";
import { useState, forwardRef } from "react";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ngeohash from "ngeohash";
import { type LatLngLiteral, type Map } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

interface LocationPickerProps {
  onChange: (location: string) => void;
}

const LocationPicker = forwardRef<Map, LocationPickerProps>(
  ({ onChange }, ref) => {
    const [position, setPosition] = useState<LatLngLiteral>();

    const MapEvents = () => {
      const map = useMapEvents({
        click(e: { latlng: LatLngLiteral }) {
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
        center={{ lat: 45.4, lng: -75.7 }}
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
