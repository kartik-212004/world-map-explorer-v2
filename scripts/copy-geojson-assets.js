import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../../src/assets/geojson')
const targetDir = path.join(__dirname, '../public/assets/geojson')

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// Copy GeoJSON files
const files = ['india.json', 'kashmir.json']

files.forEach(file => {
  const sourcePath = path.join(sourceDir, file)
  const targetPath = path.join(targetDir, file)
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath)
    console.log(`Copied ${file} successfully!`)
  } else {
    console.error(`Source file ${file} not found!`)
  }
}) 