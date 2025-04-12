const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Función para guardar una captura de pantalla
const saveScreenshot = async (page, name) => {
  const dir = path.resolve('./tests/reports/screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filePath = path.join(dir, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Captura guardada en: ${filePath}`);
};

// Función para guardar la estructura HTML
const saveHtmlStructure = async (page, name) => {
  const dir = path.resolve('./tests/reports');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filePath = path.join(dir, `${name}.html`);
  const html = await page.content();
  fs.writeFileSync(filePath, html);
  console.log(`HTML guardado en: ${filePath}`);
};

// Función para analizar la estructura básica de la página
const analyzePageStructure = async (page) => {
  // Buscar elementos comunes y registrar su presencia
  const elements = [
    'form', 'input', 'button', 'div', 'span', 'ul', 'li', 'h1', 'h2', 'h3', 
    'input[type="text"]', 'input[type="number"]', 'input[type="checkbox"]'
  ];
  
  console.log('=== ELEMENTOS ENCONTRADOS EN LA PÁGINA ===');
  
  for (const selector of elements) {
    try {
      const items = await page.$$(selector);
      console.log(`${selector}: ${items.length} elementos`);
      
      // Si hay elementos, obtener más detalles sobre el primero
      if (items.length > 0 && items.length < 10) {
        for (let i = 0; i < items.length; i++) {
          const elementInfo = await page.evaluate(el => {
            return {
              tag: el.tagName,
              id: el.id || 'sin ID',
              class: el.className || 'sin clase',
              type: el.type || 'N/A',
              value: el.value || 'N/A',
              text: el.textContent.trim().substring(0, 50) || 'sin texto'
            };
          }, items[i]);
          
          console.log(`  [${i}] ${selector}: ${JSON.stringify(elementInfo)}`);
        }
      }
    } catch (error) {
      console.error(`Error al buscar ${selector}:`, error.message);
    }
  }
};

// Función principal
(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navegar a la aplicación
    console.log('Navegando a http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    console.log('Navegación completada');
    
    // Guardar captura y HTML
    await saveScreenshot(page, 'page_overview');
    await saveHtmlStructure(page, 'page_structure');
    
    // Analizar la estructura
    await analyzePageStructure(page);
    
    console.log('Exploración completada');
  } catch (error) {
    console.error('Error durante la exploración:', error);
  } finally {
    await browser.close();
  }
})();