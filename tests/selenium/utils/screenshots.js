const fs = require('fs');
const path = require('path');

// Función para tomar capturas de pantalla durante las pruebas
const takeScreenshot = async (driver, testName) => {
  try {
    // Tomar captura de pantalla como Base64
    const screenshot = await driver.takeScreenshot();
    
    // Crear directorio de capturas si no existe
    const screenshotDir = path.resolve('./tests/reports/screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    // Generar nombre de archivo único con la fecha y hora
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${testName}_${timestamp}.png`;
    const filePath = path.join(screenshotDir, fileName);
    
    // Guardar la captura de pantalla como un archivo
    fs.writeFileSync(filePath, screenshot, 'base64');
    console.log(`Captura de pantalla guardada: ${filePath}`);
    
    return filePath;
  } catch (error) {
    console.error('Error al tomar captura de pantalla:', error);
    return null;
  }
};

module.exports = { takeScreenshot };