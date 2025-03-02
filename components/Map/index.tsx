"use client";

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import Search from "../Search";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faLayerGroup,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import {
  tileLayerGeographical,
  tileLayerPolitical,
  tileLayerTerrain,
  tileLayerSatellite,
} from "@/app/services/tile-layers";
import { useMap as useMapContext } from "@/app/context/MapContext";
import CustomMarker from "../Marker";
import { closeSound } from "@/app/utils/sounds";

// Initialize Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Create custom pointer icon
const customPointerIcon = L.icon({
  iconUrl: "/pointer.png",
  iconSize: [48, 48], // Make it a bit larger
  iconAnchor: [24, 48], // Point at bottom center of icon
  popupAnchor: [0, -48], // Popup appears above the icon
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface MapProps {
  mapType: "default" | "geopolitical";
}

// Component to handle map controls
const MapControls = ({
  map,
  onTerrainToggle,
  onSatelliteToggle,
  onTerrainOpacityChange,
  onSatelliteOpacityChange,
  showTerrain,
  showSatellite,
}: {
  map: L.Map;
  onTerrainToggle: (show: boolean) => void;
  onSatelliteToggle: (show: boolean) => void;
  onTerrainOpacityChange: (opacity: number) => void;
  onSatelliteOpacityChange: (opacity: number) => void;
  showTerrain: boolean;
  showSatellite: boolean;
}) => {
  const [showLayerOptions, setShowLayerOptions] = useState(false);
  const { updateMapStatus } = useMapContext();
  const [locationMarker, setLocationMarker] = useState<L.Marker | null>(null);
  const [terrainOpacity, setTerrainOpacity] = useState(1);
  const [satelliteOpacity, setSatelliteOpacity] = useState(1);

  // Update parent component when local opacity changes
  useEffect(() => {
    onTerrainOpacityChange(terrainOpacity);
  }, [terrainOpacity, onTerrainOpacityChange]);

  useEffect(() => {
    onSatelliteOpacityChange(satelliteOpacity);
  }, [satelliteOpacity, onSatelliteOpacityChange]);

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();

  useEffect(() => {
    const handleLocationFound = (e: L.LocationEvent) => {
      updateMapStatus("Location found!");

      // Remove existing marker if it exists
      if (locationMarker) {
        locationMarker.remove();
      }

      // Create new marker
      const marker = L.marker(e.latlng, {
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

      marker.bindPopup("You are here!").openPopup();
      setLocationMarker(marker);

      // Pan to location with animation
      map.flyTo(e.latlng, 16, {
        duration: 1.5,
      });
    };

    const handleLocationError = (e: L.ErrorEvent) => {
      updateMapStatus(
        "Error: Could not find your location. Please ensure location services are enabled."
      );
      console.error("Location error:", e.message);

      // Show error popup
      L.popup()
        .setLatLng(map.getCenter())
        .setContent(
          "Could not find your location. Please ensure location services are enabled."
        )
        .openOn(map);
    };

    map.on("locationfound", handleLocationFound);
    map.on("locationerror", handleLocationError);

    return () => {
      map.off("locationfound", handleLocationFound);
      map.off("locationerror", handleLocationError);
      if (locationMarker) {
        locationMarker.remove();
      }
    };
  }, [map, updateMapStatus, locationMarker]);

  const handleLocateMe = () => {
    updateMapStatus("Locating your position...");

    // Show loading indicator
    L.popup()
      .setLatLng(map.getCenter())
      .setContent("Finding your location...")
      .openOn(map);

    // Try to get location
    map.locate({
      setView: false, // We'll handle this in the locationfound event
      maxZoom: 16,
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout
    });
  };

  const handleLayerToggle = () => {
    setShowLayerOptions(!showLayerOptions);
  };

  return (
    <>
      <div
        id="controls-box"
        className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-[rgba(0,0,0,0.695)] p-2 rounded-lg z-[1002] flex flex-col items-center justify-center gap-3"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          title="Click to Zoom-In"
          aria-label="Click to Zoom-In"
          className="text-white hover:text-gray-300 text-xl cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={handleZoomIn}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          title="Click to Zoom-Out"
          aria-label="Click to Zoom-Out"
          className="text-white hover:text-gray-300 text-xl cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={handleZoomOut}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          title="Click to select Layers"
          aria-label="Click to select layers"
          className="text-white hover:text-gray-300 text-xl cursor-pointer w-8 h-8 flex items-center justify-center relative"
          onClick={handleLayerToggle}
        >
          <FontAwesomeIcon icon={faLayerGroup} />
        </button>
        <button
          className="text-white hover:text-gray-300 text-xl cursor-pointer w-8 h-8 flex items-center justify-center"
          id="locateme"
          title="Locate me"
          aria-label="Locate your location on map"
          onClick={handleLocateMe}
        >
          <FontAwesomeIcon icon={faLocationArrow} />
        </button>
      </div>

      {/* Layer Options Popup */}
      {showLayerOptions && (
        <div 
          className="fixed mx-3 top-1/2 right-16 transform -translate-y-1/2 bg-[rgba(0,0,0,0.695)] p-3 rounded-lg shadow-lg z-[1003]"
          style={{ pointerEvents: 'auto' }}
        >
          <h3 className="font-bold mb-2 text-sm text-white">Map Layers</h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    updateMapStatus(
                      `${e.target.checked ? "Showing" : "Hiding"} terrain layer`
                    );
                    onTerrainToggle(e.target.checked);
                  }}
                />
                Terrain
              </label>
              {showTerrain && (
                <div className="pl-6">
                  <label className="text-xs text-gray-300 mb-1 block">Opacity</label>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-white hover:text-gray-300 bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-sm font-bold"
                      onClick={() => {
                        const newOpacity = Math.max(0, terrainOpacity - 0.1);
                        updateMapStatus(
                          `Terrain layer opacity: ${Math.round(newOpacity * 100)}%`
                        );
                        setTerrainOpacity(newOpacity);
                      }}
                    >
                      −
                    </button>
                    <div className="relative flex-1 group">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={terrainOpacity}
                        className="w-full cursor-pointer"
                        onWheel={(e) => {
                          if (!e.currentTarget.matches(':hover')) return;
                          e.preventDefault();
                          const delta = e.deltaY > 0 ? -0.1 : 0.1;
                          const newOpacity = Math.min(1, Math.max(0, terrainOpacity + delta));
                          setTerrainOpacity(newOpacity);
                          updateMapStatus(
                            `Terrain layer opacity: ${Math.round(newOpacity * 100)}%`
                          );
                        }}
                        onChange={(e) => {
                          const opacity = parseFloat(e.target.value);
                          updateMapStatus(
                            `Terrain layer opacity: ${Math.round(opacity * 100)}%`
                          );
                          setTerrainOpacity(opacity);
                        }}
                      />
                      <span className="absolute right-0 top-[-20px] text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.round(terrainOpacity * 100)}%
                      </span>
                    </div>
                    <button
                      className="text-white hover:text-gray-300 bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-sm font-bold"
                      onClick={() => {
                        const newOpacity = Math.min(1, terrainOpacity + 0.1);
                        updateMapStatus(
                          `Terrain layer opacity: ${Math.round(newOpacity * 100)}%`
                        );
                        setTerrainOpacity(newOpacity);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    updateMapStatus(
                      `${
                        e.target.checked ? "Showing" : "Hiding"
                      } satellite layer`
                    );
                    onSatelliteToggle(e.target.checked);
                  }}
                />
                Satellite
              </label>
              {showSatellite && (
                <div className="pl-6">
                  <label className="text-xs text-gray-300 mb-1 block">Opacity</label>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-white hover:text-gray-300 bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-sm font-bold"
                      onClick={() => {
                        const newOpacity = Math.max(0, satelliteOpacity - 0.1);
                        updateMapStatus(
                          `Satellite layer opacity: ${Math.round(newOpacity * 100)}%`
                        );
                        setSatelliteOpacity(newOpacity);
                      }}
                    >
                      −
                    </button>
                    <div className="relative flex-1 group">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={satelliteOpacity}
                        className="w-full cursor-pointer"
                        onWheel={(e) => {
                          if (!e.currentTarget.matches(':hover')) return;
                          e.preventDefault();
                          const delta = e.deltaY > 0 ? -0.1 : 0.1;
                          const newOpacity = Math.min(1, Math.max(0, satelliteOpacity + delta));
                          setSatelliteOpacity(newOpacity);
                          updateMapStatus(
                            `Satellite layer opacity: ${Math.round(newOpacity * 100)}%`
                          );
                        }}
                        onChange={(e) => {
                          const opacity = parseFloat(e.target.value);
                          updateMapStatus(
                            `Satellite layer opacity: ${Math.round(opacity * 100)}%`
                          );
                          setSatelliteOpacity(opacity);
                        }}
                      />
                      <span className="absolute right-0 top-[-20px] text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.round(satelliteOpacity * 100)}%
                      </span>
                    </div>
                    <button
                      className="text-white hover:text-gray-300 bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-sm font-bold"
                      onClick={() => {
                        const newOpacity = Math.min(1, satelliteOpacity + 0.1);
                        updateMapStatus(
                          `Satellite layer opacity: ${Math.round(newOpacity * 100)}%`
                        );
                        setSatelliteOpacity(newOpacity);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              className="mt-2 text-xs text-gray-300 hover:text-white"
              onClick={() => {
                closeSound.play().catch(error => console.error("Error playing sound:", error));
                setShowLayerOptions(false);
                updateMapStatus("Layer options closed");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface GeoJSONFeature extends GeoJSON.Feature {
  properties: {
    NAME_1?: string;
    name?: string;
    NAME?: string;
    state?: string;
    STATE?: string;
    type?: string;
    TYPE_1?: string;
    TYPE?: string;
    population?: number;
    capital?: string;
    CAPITAL?: string;
  };
  geometry: GeoJSON.Geometry;
}

interface GeoJSONLayer extends L.Path {
  feature: GeoJSONFeature;
  setStyle(style: L.PathOptions): this;
  bindPopup(content: string): this;
  openPopup(): this;
}

// Component to handle map events and state
const MapContent = ({ mapType }: { mapType: "default" | "geopolitical" }) => {
  const map = useMap();
  const { setMap, updateCameraHeight, updateElevation, updateMapStatus, updateZoomLevel } =
    useMapContext();
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [showTerrain, setShowTerrain] = useState(false);
  const [showSatellite, setShowSatellite] = useState(false);
  const [terrainOpacity, setTerrainOpacity] = useState(1);
  const [satelliteOpacity, setSatelliteOpacity] = useState(1);
  const [statesData, setStatesData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<GeoJSONLayer | null>(null);
  const [indiaBoundary, setIndiaBoundary] = useState<GeoJSON.FeatureCollection | null>(null);
  const [kashmir, setKashmir] = useState<GeoJSON.FeatureCollection | null>(null);
  const clickMarker = useRef<L.Marker | null>(null);

  useEffect(() => {
    // Fetch states GeoJSON data
    fetch("/assets/geojson/india-osm.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.features) {
          throw new Error("Invalid GeoJSON data format");
        }
        setStatesData(data);
        updateMapStatus("States data loaded successfully");
      })
      .catch((err) => {
        console.error("Error loading states data:", err);
        updateMapStatus(
          "Error loading states data. Please try refreshing the page."
        );
      });
  }, [updateMapStatus]);

  // Add click handler for the map
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      // Remove existing click marker if any
      if (clickMarker.current) {
        clickMarker.current.remove();
      }

      // Create SVG icon for the pointer
      const svgIcon = L.divIcon({
        html: `<svg width="16" height="16" viewBox="-8 -8 16 16">
          <circle r="4" fill="black" stroke="black" stroke-width="3"/>
        </svg>`,
        className: 'custom-div-icon',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      // Add a new marker at the clicked location
      clickMarker.current = L.marker(e.latlng, {
        icon: svgIcon
      }).addTo(map);

      // Update elevation for clicked location
      updateElevation(e.latlng.lat, e.latlng.lng);
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
      if (clickMarker.current) {
        clickMarker.current.remove();
      }
    };
  }, [map, updateMapStatus, updateElevation]);

  const highlightFeature = (e: L.LeafletEvent) => {
    const layer = e.target;
    const properties = layer.feature.properties;
    
    // Try different possible property names for the region name
    const name =
      properties.NAME_1 ||
      properties.name ||
      properties.NAME ||
      properties.state ||
      properties.STATE;

    // Only proceed if it's a valid state (has a name)
    if (!name) return;

    // Remove previous selection if exists
    if (selectedRegion) {
      selectedRegion.setStyle({
        weight: 1,
        color: "#666",
        fillOpacity: 0,
        opacity: 0.2
      });
    }

    // Highlight new selection with a more visible style
    layer.setStyle({
      weight: 2,
      color: "#0066cc",
      fillOpacity: 0.1,
      fillColor: "#0066cc",
      opacity: 1
    });

    setSelectedRegion(layer as GeoJSONLayer);

    // Get additional properties if available
    const type = properties.TYPE_1 || properties.type || properties.TYPE;
    const population = properties.population || properties.POPULATION;
    const capital = properties.capital || properties.CAPITAL;

    // Build popup content
    let popupContent = `<div class="p-2">
      <h3 class="font-bold text-lg mb-2">${name}</h3>`;

    if (type) popupContent += `<p class="text-sm mb-1">Type: ${type}</p>`;
    if (capital)
      popupContent += `<p class="text-sm mb-1">Capital: ${capital}</p>`;
    if (population)
      popupContent += `<p class="text-sm mb-1">Population: ${population.toLocaleString()}</p>`;

    popupContent += "</div>";

    layer.bindPopup(popupContent).openPopup();

    updateMapStatus(`Selected: ${name}`);
  };

  const resetHighlight = (e: L.LeafletEvent) => {
    if (selectedRegion !== e.target) {
      const layer = e.target;
      layer.setStyle({
        weight: 1,
        color: "#666",
        fillOpacity: 0,
        opacity: 0.2
      });
    }
  };

  const onEachFeature = (feature: GeoJSONFeature, layer: L.Layer) => {
    if (layer instanceof L.Path) {
      const properties = feature.properties;
      const name = properties?.NAME_1 || properties?.name || properties?.NAME || properties?.state || properties?.STATE;
      
      if (name) {
        layer.on({
          click: (e) => {
            e.originalEvent.stopPropagation(); // Stop event propagation
            
            // Remove previous selection if exists
            if (selectedRegion) {
              selectedRegion.setStyle({
                weight: 1,
                color: "#666",
                fillOpacity: 0,
                opacity: 0.2
              });
            }

            // Highlight new selection with a more visible style
            const targetLayer = e.target as GeoJSONLayer;
            targetLayer.setStyle({
              weight: 3,
              color: "#2563eb",
              fillOpacity: 0.2,
              fillColor: "#3b82f6",
              opacity: 1
            });

            setSelectedRegion(targetLayer);

            // Build popup content
            let popupContent = `<div class="p-2">
              <h3 class="font-bold text-lg mb-2">${name}</h3>`;

            if (properties?.type || properties?.TYPE_1 || properties?.TYPE) {
              popupContent += `<p class="text-sm mb-1">Type: ${properties?.type || properties?.TYPE_1 || properties?.TYPE}</p>`;
            }
            if (properties?.capital || properties?.CAPITAL) {
              popupContent += `<p class="text-sm mb-1">Capital: ${properties?.capital || properties?.CAPITAL}</p>`;
            }
            if (properties?.population) {
              popupContent += `<p class="text-sm mb-1">Population: ${properties.population.toLocaleString()}</p>`;
            }

            popupContent += "</div>";

            targetLayer.bindPopup(popupContent).openPopup();
            updateMapStatus(`Selected: ${name}`);
          },
          mouseover: (e) => {
            const targetLayer = e.target as GeoJSONLayer;
            if (targetLayer !== selectedRegion) {
              targetLayer.setStyle({
                weight: 2,
                color: "#2563eb",
                fillOpacity: 0.1,
                opacity: 0.7
              });
            }
          },
          mouseout: (e) => {
            const targetLayer = e.target as GeoJSONLayer;
            if (targetLayer !== selectedRegion) {
              targetLayer.setStyle({
                weight: 1,
                color: "#666",
                fillOpacity: 0,
                opacity: 0.2
              });
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    if (map) {
      setMap(map);

      map.on("zoomend", () => {
        const currentZoom = map.getZoom();
        updateCameraHeight(currentZoom);
        updateMapStatus(`Zoom Level: ${currentZoom}`);
      });

      // Set initial zoom level
      const initialZoom = map.getZoom();
      updateCameraHeight(initialZoom);
      updateMapStatus(`Zoom Level: ${initialZoom}`);
      setMarkerPosition(map.getCenter());
    }

    return () => {
      if (map) {
        map.off("zoomend");
      }
    };
  }, [map, setMap, updateCameraHeight, updateMapStatus]);

  return (
    <>
      {/* Base Layer */}
      <TileLayer
        {...(mapType === "default"
          ? tileLayerGeographical
          : tileLayerPolitical)}
      />

      {/* Optional Layers */}
      {showTerrain && (
        <TileLayer {...tileLayerTerrain} opacity={terrainOpacity} />
      )}
      {showSatellite && (
        <TileLayer {...tileLayerSatellite} opacity={satelliteOpacity} />
      )}

      {/* States GeoJSON Layer */}
      {statesData && (
        <GeoJSON
          data={statesData}
          style={{
            weight: 1,
            color: "#666",
            fillOpacity: 0,
            opacity: 0.2
          }}
          onEachFeature={onEachFeature}
        />
      )}

      <MapControls
        map={map}
        onTerrainToggle={setShowTerrain}
        onSatelliteToggle={setShowSatellite}
        onTerrainOpacityChange={setTerrainOpacity}
        onSatelliteOpacityChange={setSatelliteOpacity}
        showTerrain={showTerrain}
        showSatellite={showSatellite}
      />
      {markerPosition && (
        <CustomMarker
          position={markerPosition}
          onPositionChange={(latlng) => setMarkerPosition(latlng)}
        />
      )}
    </>
  );
};

const Map = ({ mapType }: MapProps) => {
  const searchMarker = useRef<L.Marker | null>(null);
  const [center] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India
  const [zoom] = useState(5);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);
  const { updateMapStatus } = useMapContext();

  useEffect(() => {
    if (mapType === "geopolitical") {
      // Fetch India boundary data
      fetch("/assets/geojson/india-osm.geojson")
        .then((res) => res.json())
        .then((data) => {
          setIndiaBoundary(data);
          updateMapStatus("Loaded India boundary data");
        })
        .catch((err) => {
          console.error("Error loading India boundary:", err);
          updateMapStatus("Error loading India boundary data");
        });

      // Fetch Kashmir boundary data
      fetch("/assets/geojson/kashmir.geojson")
        .then((res) => res.json())
        .then((data) => {
          setKashmir(data);
          updateMapStatus("Loaded Kashmir boundary data");
        })
        .catch((err) => {
          console.error("Error loading Kashmir boundary:", err);
          updateMapStatus("Error loading Kashmir boundary data");
        });
    }
  }, [mapType, updateMapStatus]);

  const handleSearch = async (query: string) => {
    try {
      updateMapStatus("Searching...");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        // Extract relevant details from the response
        const details = {
          displayName: data[0].display_name.split(",")[0], // Get main place name
          type: data[0].type,
          country: data[0].address?.country,
          state: data[0].address?.state,
          coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        };

        if (mapRef) {
          // Remove existing marker if any
          if (searchMarker.current) {
            searchMarker.current.remove();
          }

          // Create new marker with the same style as location marker
          searchMarker.current = L.marker([lat, lng], {
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
          }).addTo(mapRef);

          // Zoom to location
          mapRef.flyTo([lat, lng], 19, {
            duration: 1.5,
            easeLinearity: 0.25,
          });
        }

        updateMapStatus(`Found: ${details.displayName} (Zoom: 19)`);
      } else {
        updateMapStatus("No results found");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      updateMapStatus("Error searching location");
    }
  };

  // Function to store map reference when map is initialized
  const handleMapReady = (map: L.Map) => {
    setMapRef(map);
  };

  const boundaryStyle = {
    color: "#666",
    weight: 1,
    fillOpacity: 0,
    opacity: 0.2
  };

  const kashmirStyle = {
    color: "#666",
    weight: 1,
    fillOpacity: 0,
    opacity: 0.2,
    dashArray: "5, 5"
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 left-4 z-[1000]">
        <Search onSearch={handleSearch} />
      </div>

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-screen w-full"
        ref={handleMapReady}
        zoomControl={false}
      >
        <MapContent mapType={mapType} />
        {mapType === "geopolitical" && indiaBoundary && (
          <GeoJSON 
            data={indiaBoundary} 
            style={boundaryStyle}
            interactive={false} // Disable interactions
          />
        )}
        {mapType === "geopolitical" && kashmir && (
          <GeoJSON 
            data={kashmir} 
            style={kashmirStyle}
            interactive={false} // Disable interactions
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
