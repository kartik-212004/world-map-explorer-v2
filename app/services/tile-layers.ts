export const tileLayerGeographical = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 1,
  detectRetina: true,
  errorTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
}

export const tileLayerPolitical = {
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
  maxZoom: 20,
  minZoom: 1,
  detectRetina: true,
  errorTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
}

export const tileLayerTerrain = {
  url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://stamen.com/">Stamen Design</a>',
  maxZoom: 17,
  minZoom: 1,
  detectRetina: true,
  errorTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
}

export const tileLayerSatellite = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  maxZoom: 18,
  minZoom: 1,
  detectRetina: true,
  errorTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
} 