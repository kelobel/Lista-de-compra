const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Configuración para ChromeDriver
const setupDriver = async () => {
  // Configurar opciones de Chrome
  const options = new chrome.Options();
  options.addArguments('--start-maximized');
  
  // Usar el chromedriver instalado por npm en lugar de una ruta específica
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    
  return driver;
};

module.exports = { setupDriver };