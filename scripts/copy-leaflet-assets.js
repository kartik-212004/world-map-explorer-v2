const fs = require('fs')
const path = require('path')

const leafletPath = path.join(__dirname, '../node_modules/leaflet/dist/images')
const publicPath = path.join(__dirname, '../public')

const files = [
  'marker-icon.png',
  'marker-icon-2x.png',
  'marker-shadow.png'
]

files.forEach(file => {
  fs.copyFileSync(
    path.join(leafletPath, file),
    path.join(publicPath, file)
  )
})

console.log('Leaflet marker assets copied successfully!') 