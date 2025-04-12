const fs = require('fs');
const path = require('path');

// Función para asegurarnos que existen los directorios necesarios para los reportes
function setupDirectories() {
  const reportsDir = path.resolve('./tests/reports');
  const screenshotsDir = path.resolve('./tests/reports/screenshots');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log(`Directorio creado: ${reportsDir}`);
  }
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log(`Directorio creado: ${screenshotsDir}`);
  }
}

module.exports = { setupDirectories };