"use client";

import { createContext, useContext, useState, useCallback } from "react";
import L from "leaflet";

interface MapContextType {
  map: L.Map | null;
  setMap: (map: L.Map) => void;
  status: string;
  setStatus: (status: string) => void;
  cameraHeight: string;
  setCameraHeight: (height: string) => void;
  elevation: string;
  setElevation: (elevation: string) => void;
  updateMapStatus: (message: string) => void;
  updateCameraHeight: (zoom: number) => void;
  updateElevation: (lat: number, lng: number) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [status, setStatus] = useState("");
  const [cameraHeight, setCameraHeight] = useState("");
  const [elevation, setElevation] = useState("");

  const updateMapStatus = useCallback((message: string) => {
    setStatus(message);
  }, []);

  const updateCameraHeight = useCallback((zoom: number) => {
    const height = Math.round(10000000 * Math.pow(0.5, zoom));
    const heightInKilometers = height / 1000;
    setCameraHeight(`View Height: ${heightInKilometers.toLocaleString()} Km`);
  }, []);

  const updateElevation = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
      );
      const data = await response.json();
      if (data.results[0].elevation) {
        setElevation(
          `Altitude: ${Math.round(data.results[0].elevation)} meters`
        );
      }
    } catch (error) {
      console.error("Error fetching elevation:", error);
      setElevation("Altitude: Not available");
    }
  }, []);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        status,
        setStatus,
        cameraHeight,
        setCameraHeight,
        elevation,
        setElevation,
        updateMapStatus,
        updateCameraHeight,
        updateElevation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}

export default MapContext;
