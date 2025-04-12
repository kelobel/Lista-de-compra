const puppeteer = require('puppeteer');

/**
 * Configuración para iniciar y configurar Puppeteer
 * @returns {Promise<Object>} - Promise que resuelve con el objeto browser
 */
const setupBrowser = async () => {
  console.log("Iniciando navegador con Puppeteer...");
  
  try {
    const browser = await puppeteer.launch({
      headless: false, // false para ver el navegador mientras se ejecutan las pruebas
      defaultViewport: null,
      args: ['--start-maximized'],
      timeout: 30000 // 30 segundos de timeout
    });
    
    console.log("Navegador inicializado correctamente");
    return browser;
  } catch (error) {
    console.error("Error al inicializar el navegador:", error);
    throw error;
  }
};

module.exports = { setupBrowser };