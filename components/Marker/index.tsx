"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { bordercrossSound } from "@/app/utils/sounds";

interface MarkerProps {
  position: L.LatLng;
  onPositionChange?: (latlng: L.LatLng) => void;
  icon?: L.Icon;
}

const CustomMarker = ({ position, onPositionChange, icon }: MarkerProps) => {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);
  const borderRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!markerRef.current) {
      markerRef.current = icon 
        ? L.marker(position, { icon }).addTo(map)
        : L.circleMarker(position, {
            radius: 4,
            color: "black",
            fillOpacity: 1,
          }).addTo(map);
    }

    const handleClick = async (e: L.LeafletMouseEvent) => {
      if (markerRef.current) {
        const oldPosition = markerRef.current.getLatLng();
        markerRef.current.setLatLng(e.latlng);

        // Play sound
        bordercrossSound.play();

        // Update border
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${
              e.latlng.lat
            }&lon=${
              e.latlng.lng
            }&format=geojson&polygon_geojson=1&zoom=${map.getZoom()}`
          );
          const data = await response.json();

          // Remove old border if exists
          if (borderRef.current) {
            borderRef.current.remove();
          }

          // Create a valid GeoJSON object based on the response format
          let validGeoJSON;
          
          if (data.type === "Feature") {
            // Single Feature response
            validGeoJSON = {
              type: "FeatureCollection",
              features: [data]
            };
          } else if (data.type === "FeatureCollection") {
            // FeatureCollection response
            validGeoJSON = data;
          } else if (data.geojson) {
            // Nominatim specific response with geojson property
            validGeoJSON = {
              type: "FeatureCollection",
              features: [{
                type: "Feature",
                geometry: data.geojson,
                properties: data.address || {}
              }]
            };
          } else {
            // Fallback to bounding box if no valid GeoJSON
            const bbox = data.bbox || [
              e.latlng.lng - 0.01,
              e.latlng.lat - 0.01,
              e.latlng.lng + 0.01,
              e.latlng.lat + 0.01,
            ];
            validGeoJSON = {
              type: "FeatureCollection",
              features: [{
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [[
                    [bbox[0], bbox[1]],
                    [bbox[2], bbox[1]],
                    [bbox[2], bbox[3]],
                    [bbox[0], bbox[3]],
                    [bbox[0], bbox[1]],
                  ]],
                },
                properties: data.address || {}
              }]
            };
          }

          // Add new border
          borderRef.current = L.geoJSON(validGeoJSON, {
            style: {
              color: "red",
              weight: 2,
              fillOpacity: 0.1,
            },
          }).addTo(map);
        } catch (error) {
          console.error("Error fetching border:", error);
        }

        onPositionChange?.(e.latlng);
      }
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (borderRef.current) {
        borderRef.current.remove();
      }
    };
  }, [map, position, onPositionChange, icon]);

  return null;
};

export default CustomMarker;
