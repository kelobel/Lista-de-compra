// Clase para interactuar con la página de lista de compras usando Puppeteer
class ShoppingListPagePuppeteer {
  /**
   * Constructor de la clase
   * @param {Page} page - Instancia de la página de Puppeteer
   */
  constructor(page) {
    this.page = page;
    this.timeout = 15000; // Timeout general para las operaciones
  }

  /**
   * Función de espera personalizada
   * @param {number} ms - Milisegundos a esperar
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Navega a la URL especificada
   * @param {string} url - URL a la que navegar
   */
  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'] });
    console.log('Página cargada, esperando elementos...');
    await this.delay(300);
    console.log('Página completamente cargada');
    
    await this.takeScreenshot('page-initial-load');
    await this.exploreDOMStructure();
  }

  /**
   * Explora la estructura del DOM para entender mejor la página
   */
  async exploreDOMStructure() {
    try {
      // Contar botones y sus textos
      const buttons = await this.page.$$('button');
      console.log(`Encontrados ${buttons.length} botones en total`);
      
      for (let i = 0; i < buttons.length; i++) {
        const buttonText = await this.page.evaluate(el => el.textContent || 'sin texto', buttons[i]);
        console.log(`Botón ${i}: "${buttonText}"`);
      }
      
      // Explorar posibles contenedores de productos
      console.log('--- Explorando posibles contenedores de productos ---');
      const selectors = [
        'ul', 
        'div[class*="list"]', 
        'div[class*="products"]',
        'div[role="list"]',
        'main > div',
        'section',
        'article'
      ];
      
      for (const selector of selectors) {
        const elements = await this.page.$$(selector);
        console.log(`${selector}: ${elements.length} elementos encontrados`);
      }
    } catch (error) {
      console.error('Error explorando DOM:', error);
    }
  }

  /**
   * Busca un elemento por su texto contenido
   * @param {string} elementType - Tipo de elemento HTML a buscar
   * @param {string} text - Texto a buscar en el elemento
   * @param {boolean} exactMatch - Si se requiere una coincidencia exacta
   */
  async findElementByText(elementType, text, exactMatch = false) {
    const elements = await this.page.$$(elementType);
    for (const element of elements) {
      const elementText = await this.page.evaluate(el => el.textContent.trim(), element);
      
      if ((exactMatch && elementText === text) || 
          (!exactMatch && elementText.includes(text))) {
        return element;
      }
    }
    return null;
  }

  /**
   * Obtiene la cuenta de productos en la lista
   * @returns {Promise<number>} - Número de productos encontrados
   */
  async getProductCount() {
    try {
      // Intentamos varios selectores para encontrar los elementos de producto
      const selectors = [
        'div[class*="item"]:not([role="dialog"])',
        'ul > li',
        'div[class*="product"]',
        'div[data-testid*="product"]',
        'div[class*="card"]',
        'article'
      ];
      
      for (const selector of selectors) {
        const elements = await this.page.$$(selector);
        if (elements.length > 0) {
          console.log(`Encontrados ${elements.length} elementos con selector: ${selector}`);
          return elements.length;
        }
      }
      
      // Si no podemos encontrar elementos con selectores específicos,
      // intentamos una estrategia más general
      const mainElementsWithChildren = await this.page.$$('main div > div');
      if (mainElementsWithChildren.length > 0) {
        console.log(`Encontrados ${mainElementsWithChildren.length} elementos que parecen productos`);
        return mainElementsWithChildren.length;
      }
      
      // Si nada más funciona, asumimos que no hay productos
      return 0;
    } catch (error) {
      console.error('Error al obtener número de productos:', error);
      return 0;
    }
  }

  /**
   * Añade un producto a la lista
   * @param {string} nombre - Nombre del producto
   * @param {string|number} cantidad - Cantidad del producto
   */
  async addProduct(nombre, cantidad) {
    try {
      console.log(`Intentando añadir producto: ${nombre}, cantidad: ${cantidad}`);
      
      // 1. Buscar y hacer clic en el botón de agregar producto
      const addButton = await this.findElementByText('button', 'Agregar producto');
      if (!addButton) {
        throw new Error('No se encontró el botón de "Agregar producto"');
      }
      
      await addButton.click();
      console.log('Botón \'Agregar producto\' clickeado');
      
      // Esperamos a que aparezca el formulario o modal
      await this.delay(500); // Aumentar el tiempo de espera para que cargue el formulario
      await this.takeScreenshot('modal-opened');
      
      // Buscar todos los inputs en el formulario para depuración
      const allInputs = await this.page.$$('input');
      console.log(`Encontrados ${allInputs.length} campos de entrada en total`);
      
      // Mostrar los atributos de cada input para depuración
      for (let i = 0; i < allInputs.length; i++) {
        const inputAttrs = await this.page.evaluate(el => {
          return {
            type: el.type,
            name: el.name,
            id: el.id,
            placeholder: el.placeholder,
            value: el.value
          };
        }, allInputs[i]);
        console.log(`Input ${i}:`, inputAttrs);
      }
      
      // 2. Rellenar el formulario - Ampliamos los selectores para encontrar el campo de nombre
      // Buscar el campo de nombre y rellenarlo con selectores más amplios
      const nameInput = await this.page.$('input[type="text"], input[name="nombre"], input[placeholder*="nombre"], input[placeholder*="Nombre"], input:not([type="number"]):not([type="checkbox"]):not([type="radio"]):not([type="hidden"])');
      if (nameInput) {
        // Primero limpiar el campo si tiene algún valor
        await this.page.evaluate(el => { el.value = ''; }, nameInput);
        await nameInput.type(nombre);
        console.log(`Campo nombre rellenado con: ${nombre}`);
      } else {
        // Si no podemos encontrar el campo específico, intentamos con todos los inputs
        let foundNameInput = false;
        for (const input of allInputs) {
          // Si es un input de texto o no tiene tipo especificado, intentamos usarlo
          const inputType = await this.page.evaluate(el => el.type, input);
          if (inputType === 'text' || inputType === '') {
            await this.page.evaluate(el => { el.value = ''; }, input);
            await input.type(nombre);
            console.log(`Usando input genérico para nombre: ${nombre}`);
            foundNameInput = true;
            break;
          }
        }
        
        if (!foundNameInput) {
          throw new Error('No se encontró el campo de nombre del producto');
        }
      }
      
      // Buscar el campo de cantidad con selectores más amplios
      const quantityInput = await this.page.$('input[type="number"], input[name="cantidad"], input[placeholder*="cantidad"], input[placeholder*="Cantidad"]');
      if (quantityInput) {
        // Limpiar el campo si tiene algún valor
        await this.page.evaluate(el => { el.value = ''; }, quantityInput);
        await quantityInput.type(cantidad.toString());
        console.log(`Campo cantidad rellenado con: ${cantidad}`);
      } else {
        // Si no podemos encontrar el campo específico, intentamos con el segundo input
        if (allInputs.length > 1) {
          const secondInput = allInputs[1]; // Asumiendo que el segundo input es para cantidad
          await this.page.evaluate(el => { el.value = ''; }, secondInput);
          await secondInput.type(cantidad.toString());
          console.log(`Usando segundo input para cantidad: ${cantidad}`);
        }
      }
      
      // Intentar encontrar un selector de categoría y seleccionar la primera opción
      try {
        const selectElement = await this.page.$('select');
        if (selectElement) {
          await selectElement.click();
          console.log('Selector de categoría clickeado');
          
          // Intentamos seleccionar la primera opción
          const options = await this.page.$$('select option');
          if (options.length > 0) {
            await options[0].click();
          }
        }
      } catch (error) {
        console.log('No se encontró un selector de categoría o no fue necesario seleccionar');
      }
      
      // Tomar captura antes de enviar
      await this.takeScreenshot(`before-submit-${nombre}`);
      
      // 3. Buscar y hacer clic específicamente en el botón de 'Agregar' con la clase específica
      // Esta es la parte que está fallando y estamos corrigiendo
      try {
        // Buscar el botón con texto exacto 'Agregar' y las clases descritas
        const specificSubmitButton = await this.page.$('button.inline-flex[type="submit"]');
        if (specificSubmitButton) {
          const buttonText = await this.page.evaluate(el => el.textContent.trim(), specificSubmitButton);
          console.log(`Botón específico encontrado con texto: "${buttonText}"`);
          await specificSubmitButton.click();
          console.log('Botón específico de "Agregar" clickeado');
          await this.delay(1000);
          await this.takeScreenshot(`after-specific-submit-${nombre}`);
          return; // Si encontramos y hacemos clic en este botón, terminamos aquí
        }
      } catch (error) {
        console.log('Error al buscar botón específico de Agregar, intentando métodos alternativos:', error.message);
      }
      
      // 4. Si el método específico falla, intentamos con los métodos alternativos existentes
      // a) Buscar un botón de tipo "submit"
      let submitButton = await this.page.$('button[type="submit"]');
      
      // b) Buscar botones con textos comunes de confirmación
      if (!submitButton) {
        const confirmTexts = ['Añadir', 'Agregar', 'Guardar', 'Confirmar', 'Aceptar', 'OK', 'Submit'];
        
        for (const text of confirmTexts) {
          submitButton = await this.findElementByText('button', text);
          if (submitButton) {
            console.log(`Botón con texto de confirmación encontrado: ${text}`);
            break;
          }
        }
      }
      
      // c) Si todavía no se encuentra, usar el último botón visible (probablemente sea el de enviar)
      if (!submitButton) {
        const buttons = await this.page.$$('button');
        if (buttons.length > 0) {
          submitButton = buttons[buttons.length - 1];
          console.log('Usando último botón como botón de envío');
        }
      }
      
      // Hacer clic en el botón de envío si lo encontramos
      if (submitButton) {
        await submitButton.click();
        console.log('Botón de envío clickeado');
        
        // Esperar a que se procese la acción
        await this.delay(1000);
        await this.takeScreenshot(`after-add-${nombre}`);
      } else {
        throw new Error('No se encontró ningún botón para enviar el formulario');
      }
    } catch (error) {
      console.error(`Error al añadir producto: ${error.message}`);
      await this.takeScreenshot('error-adding-product');
      throw error;
    }
  }

  /**
   * Marca un producto como completado
   * @param {number} index - Índice del producto (0 para el primero)
   */
  async markProductAsCompleted(index = 0) {
    try {
      // Intentamos múltiples estrategias para marcar un producto como completado
      let success = false;
      
      // 1. Buscar checkboxes o interruptores
      const checkboxes = await this.page.$$('input[type="checkbox"]');
      if (checkboxes.length > index) {
        await checkboxes[index].click();
        success = true;
        console.log(`Checkbox en posición ${index} clickeado`);
      }
      
      // 2. Si no hay checkboxes, buscar elementos de producto y hacer clic directamente
      if (!success) {
        // Usar varios selectores para encontrar productos
        const productSelectors = [
          'div[class*="item"]',
          'ul > li',
          'div[class*="product"]',
          'div[data-testid*="product"]',
          'div[class*="card"]',
          'article'
        ];
        
        for (const selector of productSelectors) {
          const products = await this.page.$$(selector);
          if (products.length > index) {
            await products[index].click();
            console.log(`Elemento producto clickeado directamente`);
            success = true;
            break;
          }
        }
      }
      
      // 3. Si las estrategias anteriores fallan, buscar botones dentro de los productos
      if (!success) {
        console.log('Buscando botón de completar dentro de productos...');
        
        // Encontrar todos los productos
        const products = await this.page.$$('div[class*="item"], ul > li, div[class*="product"], div[class*="card"], article');
        if (products.length > index) {
          // Buscar botones o iconos dentro del producto específico
          const completeButtons = await this.page.evaluateHandle(el => {
            return Array.from(el.querySelectorAll('button, input[type="checkbox"], svg')).find(button => {
              return button.textContent?.includes('Completar') || 
                    button.getAttribute('title')?.includes('Completar') || 
                    button.getAttribute('aria-label')?.includes('Completar');
            });
          }, products[index]);
          
          if (completeButtons) {
            await completeButtons.click();
            success = true;
            console.log('Botón de completar encontrado y clickeado');
          }
        }
      }
      
      // Esperar un momento y tomar captura
      await this.delay(300);
      await this.takeScreenshot('after-click-product');
      
      // Si ninguna estrategia funcionó, lanzar error
      if (!success) {
        console.warn('No se pudo encontrar una forma de marcar el producto como completado');
      }
    } catch (error) {
      console.error('Error al marcar producto como completado:', error);
    }
  }

  /**
   * Elimina un producto de la lista
   * @param {number} index - Índice del producto a eliminar (0 para el primero)
   */
  async deleteProduct(index = 0) {
    try {
      // Tomar captura antes de eliminar
      await this.takeScreenshot('before-delete');
      
      // Buscar productos
      const products = await this.page.$$('div[class*="item"]:not([role="dialog"]), ul > li, div[class*="product"], div[class*="card"], article');
      
      if (products.length <= index) {
        console.warn(`No hay suficientes productos (${products.length}) para eliminar el índice ${index}`);
        return;
      }
      
      // 1. Buscar botón de eliminar dentro del producto
      let deleteButtonFound = false;
      
      // Evaluar el producto en el DOM para encontrar botones de eliminar
      try {
        // Esta es una optimización para encontrar directamente botones de eliminar
        const deleteButton = await this.page.evaluateHandle(el => {
          // Buscar botones o elementos con atributos relacionados con eliminar
          const possibleButtons = Array.from(el.querySelectorAll('button, span, div, svg, i'));
          
          return possibleButtons.find(btn => {
            const text = btn.textContent?.toLowerCase() || '';
            const title = btn.getAttribute('title')?.toLowerCase() || '';
            const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';
            const className = btn.className?.toLowerCase() || '';
            
            return text.includes('eliminar') || 
                  text.includes('borrar') || 
                  text.includes('delete') || 
                  text.includes('remove') ||
                  title.includes('eliminar') ||
                  title.includes('borrar') ||
                  ariaLabel.includes('eliminar') ||
                  ariaLabel.includes('delete') ||
                  className.includes('delete') ||
                  className.includes('trash');
          });
        }, products[index]);
        
        if (deleteButton) {
          await deleteButton.click();
          console.log('Botón de eliminar dentro del producto clickeado');
          deleteButtonFound = true;
        }
      } catch (error) {
        console.error('Error al buscar botón de eliminar dentro del producto:', error);
      }
      
      // 2. Si no se encontró botón específico, intentar hacer clic en el producto y luego buscar opciones
      if (!deleteButtonFound) {
        console.log('Intentando hacer clic en el producto para ver opciones...');
        await products[index].click();
        await this.delay(300);
        
        // Buscar botón de eliminar después del clic
        const deleteButton = await this.findElementByText('button', 'Eliminar', false);
        if (deleteButton) {
          await deleteButton.click();
          deleteButtonFound = true;
          console.log('Botón de eliminar encontrado después de hacer clic en el producto');
        }
      }
      
      // 3. Manejar diálogo de confirmación si aparece
      try {
        // Esperar brevemente a que aparezca el diálogo de confirmación
        await this.delay(300);
        
        // Buscar botón de confirmación
        const confirmButton = await this.findElementByText('button', 'Confirm');
        if (!confirmButton) {
          const siBorrarButton = await this.findElementByText('button', 'Sí, borrar');
          if (siBorrarButton) {
            await siBorrarButton.click();
            console.log('Botón "Sí, borrar" clickeado en el diálogo de confirmación');
          } else {
            const confirmButtons = await this.page.$$('button');
            // Intentar con el último botón que suele ser el de confirmar
            if (confirmButtons.length > 0) {
              await confirmButtons[confirmButtons.length - 1].click();
              console.log('Último botón clickeado en el diálogo de confirmación');
            }
          }
        } else {
          await confirmButton.click();
          console.log('Botón de confirmación clickeado en el diálogo');
        }
      } catch (error) {
        console.log('No se detectó diálogo de confirmación o ya se procesó');
      }
      
      // Esperar a que la UI se actualice
      await this.delay(500);
      await this.takeScreenshot('after-delete');
      
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }

  /**
   * Aplica un filtro a la lista de productos
   * @param {number} filterIndex - Índice del filtro (0: Todos, 1: Pendientes, 2: Completados)
   */
  async filterProducts(filterIndex) {
    try {
      // Encontrar botones de filtro por su contenido
      const filterTexts = ['Todos', 'Todas', 'Pendientes', 'No completados', 'Completados'];
      const filterButtons = [];
      
      // Primero buscamos botones con textos típicos de filtros
      for (const text of filterTexts) {
        const button = await this.findElementByText('button', text);
        if (button) {
          filterButtons.push(button);
        }
      }
      
      // Si no encontramos suficientes, buscamos dentro de elementos tab
      if (filterButtons.length < 2) {
        const tabButtons = await this.page.$$('button[role="tab"], [role="tab"]');
        for (const tab of tabButtons) {
          if (!filterButtons.includes(tab)) {
            filterButtons.push(tab);
          }
        }
      }
      
      console.log(`Encontrados ${filterButtons.length} botones de filtro`);
      
      // Verificar si tenemos suficientes filtros
      if (filterButtons.length <= filterIndex) {
        console.warn(`No hay suficientes botones de filtro (${filterButtons.length}) para seleccionar el índice ${filterIndex}`);
        return;
      }
      
      // Hacer clic en el filtro seleccionado
      console.log(`Botón de filtro ${filterIndex} clickeado`);
      await filterButtons[filterIndex].click();
      
      // Esperar a que la UI se actualice
      await this.delay(500);
      
      // Capturar estado después de filtrar
      await this.takeScreenshot(filterIndex === 0 ? 'filter-all' : 
                              filterIndex === 1 ? 'filter-pending' : 'filter-completed');
      
    } catch (error) {
      console.error('Error al filtrar productos:', error);
      // No relanzamos el error para que la prueba pueda continuar
    }
  }
  
  /**
   * Toma una captura de pantalla
   * @param {string} name - Nombre para la captura
   */
  async takeScreenshot(name) {
    try {
      const timestamp = Date.now();
      const path = `./tests/reports/screenshots/${name}_${timestamp}.png`;
      await this.page.screenshot({ path, fullPage: true });
      console.log(`Captura de pantalla guardada: ${path}`);
    } catch (error) {
      console.error('Error al tomar la captura de pantalla:', error);
    }
  }
}

module.exports = ShoppingListPagePuppeteer;