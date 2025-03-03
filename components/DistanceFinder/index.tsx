"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSearch,
  faMapMarkedAlt,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { useMap as useMapContext } from "@/app/context/MapContext";
import "@/app/utils/polyline";

interface DistanceFinderProps {
  map: L.Map | null;
  onClose: () => void;
}

const DistanceFinder = ({ map, onClose }: DistanceFinderProps) => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startResults, setStartResults] = useState<any[]>([]);
  const [endResults, setEndResults] = useState<any[]>([]);
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [showDistanceResult, setShowDistanceResult] = useState(false);
  const [isMapClickEnabled, setIsMapClickEnabled] = useState(false);
  const routeLayer = useRef<L.Polyline | null>(null);
  const { updateMapStatus } = useMapContext();
  const startMarker = useRef<L.Marker | null>(null);
  const endMarker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      if (!isMapClickEnabled || !startMarker.current) return;

      const { lat, lng } = e.latlng;
      
      if (endMarker.current) {
        endMarker.current.remove();
      }

      endMarker.current = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map);

      setEndPoint(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      setIsMapClickEnabled(false);
      updateMapStatus("Destination point selected");
    };

    if (isMapClickEnabled) {
      map.on('click', handleMapClick);
      updateMapStatus("Click on map to select destination point");
    }

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, isMapClickEnabled, updateMapStatus]);

  const enableMapClick = () => {
    if (!startMarker.current) {
      updateMapStatus("Please select a starting point first");
      return;
    }
    setIsMapClickEnabled(true);
    updateMapStatus("Click on map to select destination point");
  };

  const searchLocation = async (query: string, isStart: boolean) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`,
        {
          headers: {
            "User-Agent": "World-Map-Explorer/1.0",
          },
        }
      );
      const data = await response.json();
      if (isStart) {
        setStartResults(data);
      } else {
        setEndResults(data);
      }
    } catch (error) {
      console.error("Error searching:", error);
      updateMapStatus("Error searching location");
    }
  };

  const handleLocationSelect = async (result: any, isStart: boolean) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    if (!map) return;

    if (isStart) {
      setStartPoint(result.display_name);
      setStartResults([]);
      if (startMarker.current) {
        startMarker.current.remove();
      }
      startMarker.current = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map);
    } else {
      setEndPoint(result.display_name);
      setEndResults([]);
      if (endMarker.current) {
        endMarker.current.remove();
      }
      endMarker.current = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map);
    }
  };

  const calculateDistance = async () => {
    if (!startMarker.current || !endMarker.current || !map) return;

    const startLatLng = startMarker.current.getLatLng();
    const endLatLng = endMarker.current.getLatLng();

    try {
      updateMapStatus("Calculating route...");

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLatLng.lng},${startLatLng.lat};${endLatLng.lng},${endLatLng.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const distanceInKm = Math.round(route.distance / 1000);
        const timeInHours = Math.floor(route.duration / 3600);
        const timeInMinutes = Math.round((route.duration % 3600) / 60);

        setDistance(`${distanceInKm} Kilo meters`);
        setTime(`${timeInHours} Hours ${timeInMinutes} Minutes`);
        setShowDistanceResult(true);

        if (routeLayer.current) {
          routeLayer.current.remove();
        }

        const coordinates = route.geometry.coordinates.map((coord) => [
          coord[1],
          coord[0],
        ]);
        routeLayer.current = L.polyline(coordinates, {
          color: "#0000FF",
          weight: 4,
          opacity: 0.8,
          smoothFactor: 1,
        }).addTo(map);

        const bounds = L.latLngBounds([startLatLng, endLatLng]);
        coordinates.forEach((coord) => {
          bounds.extend(coord);
        });

        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 10,
        });

        updateMapStatus(`Route found: ${distanceInKm} km`);
      } else {
        updateMapStatus("Could not find a route between these points");
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      updateMapStatus("Error calculating route");
    }
  };

  const cleanup = () => {
    if (startMarker.current) startMarker.current.remove();
    if (endMarker.current) endMarker.current.remove();
    if (routeLayer.current) routeLayer.current.remove();
    onClose();
  };

  const handleSearch = (query: string, isStart: boolean) => {
    if (!query.trim()) return;
    searchLocation(query, isStart);
  };

  return (
    <div
      className="box active bg-[#f0eaea] shadow-md"
      id="box"
      tabIndex={0}
      aria-label="distance finder opened"
      style={{ backgroundColor: "#f0eaea" }}
    >
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        id="closeBtn"
        aria-label="close distance finder"
        tabIndex={0}
        onClick={cleanup}
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>

      <h1 style={{ fontSize: "30px" }} className="font-bold mb-4">
        Find Distance
      </h1>

      <div className="box-input">
        <span>
          <i className="fas fa-circle"></i>
        </span>
        <div className="dist-input" id="c-beginning">
          <input
            type="text"
            tabIndex={0}
            id="beginning"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className=""
            placeholder="Enter Starting point"
            aria-label="type place and press enter"
          />
          <button
            tabIndex={0}
            aria-label="click to see suggestions"
            id="b-searchbutton"
            onClick={() => handleSearch(startPoint, true)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {startResults.length > 0 && (
          <ul id="search-results">
            {startResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleLocationSelect(result, true)}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="box-input">
        <span>
          <i className="fas fa-map-marker-alt"></i>
        </span>
        <div className="dist-input" id="c-destination">
          <input
            tabIndex={0}
            type="text"
            id="destination"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            placeholder="Enter Destination or click on map"
            aria-label="type place and press enter"
            disabled={isMapClickEnabled}
          />
          <button
            id="d-searchbutton"
            tabIndex={0}
            aria-label="click to see suggestions"
            onClick={() => handleSearch(endPoint, false)}
            disabled={isMapClickEnabled}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {endResults.length > 0 && (
          <ul id="search-results">
            {endResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleLocationSelect(result, false)}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className={`fas fa-map-marked-alt ${isMapClickEnabled ? 'text-blue-500' : ''}`}
        aria-hidden="true"
        title="Choose from map"
        id="fromMap"
        tabIndex={-1}
        onClick={enableMapClick}
      >
        <FontAwesomeIcon icon={faMapMarkedAlt} className={isMapClickEnabled ? 'text-blue-500' : 'text-black'} />
      </button>

      <button
        className="fas flex flex-row justify-between items-centerfa-arrow-circle-right"
        tabIndex={0}
        style={{ backgroundColor: "white", padding: "10px" }}
        id="find"
        title="Find Distance"
        aria-label="click to Find distance"
        onClick={calculateDistance}
        disabled={!startMarker.current || !endMarker.current}
      >
        <FontAwesomeIcon className="text-black" icon={faArrowCircleRight} />
      </button>

      {showDistanceResult && (
        <div tabIndex={0} id="distanceResult" aria-live="polite">
          Distance: <span id="dist">{distance}</span>
          <br />
          Time: <span id="time">{time}</span>
        </div>
      )}

      <p style={{ fontSize: "10px" }} className="text-center">
        <br />
        Directions courtesy of{" "}
        <a
          href="https://project-osrm.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OSRM
        </a>
      </p>
    </div>
  );
};

export default DistanceFinder;
