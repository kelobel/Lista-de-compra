const http = require('http');

/**
 * Verifica si la aplicación está disponible en la URL proporcionada
 * @param {string} url - URL de la aplicación (sin http://)
 * @param {number} port - Puerto en el que se ejecuta la aplicación
 * @param {number} timeout - Tiempo máximo de espera en milisegundos
 * @returns {Promise<boolean>} - Promise que se resuelve a true si la aplicación está disponible
 */
function checkAppAvailability(url, port, timeout = 5000) {
  console.log(`Verificando disponibilidad en ${url}:${port} con timeout de ${timeout}ms`);
  
  return new Promise((resolve) => {
    const options = {
      hostname: url,
      port: port,
      path: '/',
      method: 'HEAD',
      timeout: timeout,
    };

    const req = http.request(options, (res) => {
      console.log(`Respuesta recibida con código: ${res.statusCode}`);
      resolve(res.statusCode < 400); // Consideramos disponible si el código es < 400
    });

    req.on('error', (error) => {
      console.error(`Error al conectar: ${error.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.error(`Tiempo de espera agotado al intentar conectar con ${url}:${port}`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

module.exports = { checkAppAvailability };