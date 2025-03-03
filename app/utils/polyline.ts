/**
 * Based on the official Google polyline encoding algorithm
 * https://developers.google.com/maps/documentation/utilities/polylinealgorithm
 */

declare module 'leaflet' {
  interface Polyline {
    fromEncoded(encoded: string): L.Polyline;
  }
}

L.Polyline.fromEncoded = function(encoded: string): L.Polyline {
  const precision = 5;
  const factor = Math.pow(10, precision);
  
  let lat = 0;
  let lng = 0;
  const coordinates: [number, number][] = [];
  let index = 0;
  
  encoded = encoded.replace(/\\\\/g, '\\').replace(/\\\"/g, '"');
  
  // Process characters 5 at a time
  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    
    // Process latitude
    do {
      let b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (index < encoded.length && encoded.charCodeAt(index - 1) >= 0x20);
    
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    
    shift = 0;
    result = 0;
    
    // Process longitude
    do {
      let b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (index < encoded.length && encoded.charCodeAt(index - 1) >= 0x20);
    
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;
    
    coordinates.push([lat / factor, lng / factor]);
  }
  
  return L.polyline(coordinates);
};

export {}; 