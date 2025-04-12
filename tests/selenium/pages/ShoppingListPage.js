const { By, until } = require('selenium-webdriver');

class ShoppingListPage {
  constructor(driver) {
    this.driver = driver;
    
    // Selectores de elementos de la página
    this.selectors = {
      // Formulario para añadir productos
      nameInput: By.css('input[placeholder="Nombre del producto"]'),
      quantityInput: By.css('input[placeholder="Cantidad"]'),
      categorySelect: By.css('[role="combobox"]'), // Selector para el dropdown
      categoryOption: (category) => By.xpath(`//div[contains(@role, 'option') and contains(text(), '${category}')]`),
      addButton: By.xpath('//button[contains(text(), "Añadir")]'),
      
      // Lista de productos
      productItems: By.css('[data-testid="product-item"]'),
      productName: (name) => By.xpath(`//div[contains(text(), '${name}')]`),
      productCheckbox: (name) => By.xpath(`//div[contains(text(), '${name}')]/ancestor::div//input[@type='checkbox']`),
      deleteButton: (name) => By.xpath(`//div[contains(text(), '${name}')]/ancestor::div//button[contains(@aria-label, 'Eliminar')]`),
      editButton: (name) => By.xpath(`//div[contains(text(), '${name}')]/ancestor::div//button[contains(@aria-label, 'Editar')]`),
      
      // Diálogo de confirmación
      confirmDeleteButton: By.xpath('//button[contains(text(), "Eliminar")]'),
      cancelDeleteButton: By.xpath('//button[contains(text(), "Cancelar")]'),
      
      // Tabs
      allProductsTab: By.xpath('//button[contains(text(), "Todos")]'),
      pendingProductsTab: By.xpath('//button[contains(text(), "Pendientes")]'),
      completedProductsTab: By.xpath('//button[contains(text(), "Comprados")]'),
      
      // Estadísticas
      progressBar: By.css('[role="progressbar"]')
    };
  }

  // Método para cargar la página
  async navigateTo(url) {
    await this.driver.get(url);
    await this.driver.wait(until.elementLocated(this.selectors.addButton), 10000);
    return this;
  }

  // Método para añadir un producto
  async addProduct(name, quantity, category) {
    await this.driver.findElement(this.selectors.nameInput).sendKeys(name);
    await this.driver.findElement(this.selectors.quantityInput).sendKeys(quantity);
    
    // Seleccionar categoría
    await this.driver.findElement(this.selectors.categorySelect).click();
    await this.driver.wait(until.elementLocated(this.selectors.categoryOption(category)), 5000);
    await this.driver.findElement(this.selectors.categoryOption(category)).click();
    
    // Hacer clic en el botón añadir
    await this.driver.findElement(this.selectors.addButton).click();
    
    // Esperar a que aparezca el producto en la lista
    await this.driver.wait(until.elementLocated(this.selectors.productName(name)), 5000);
    
    return this;
  }

  // Método para marcar un producto como comprado
  async markProductAsCompleted(name) {
    const checkbox = await this.driver.findElement(this.selectors.productCheckbox(name));
    await checkbox.click();
    return this;
  }

  // Método para eliminar un producto
  async deleteProduct(name) {
    // Hacer clic en el botón de eliminar
    await this.driver.findElement(this.selectors.deleteButton(name)).click();
    
    // Confirmar la eliminación
    await this.driver.wait(until.elementLocated(this.selectors.confirmDeleteButton), 5000);
    await this.driver.findElement(this.selectors.confirmDeleteButton).click();
    
    // Esperar a que el producto desaparezca
    try {
      await this.driver.wait(until.stalenessOf(await this.driver.findElement(this.selectors.productName(name))), 5000);
    } catch (error) {
      // Si no se encuentra el elemento, significa que ya fue eliminado
      console.log('Producto eliminado correctamente');
    }
    
    return this;
  }

  // Método para filtrar productos
  async filterProducts(filter) {
    switch (filter) {
      case 'Todos':
        await this.driver.findElement(this.selectors.allProductsTab).click();
        break;
      case 'Pendientes':
        await this.driver.findElement(this.selectors.pendingProductsTab).click();
        break;
      case 'Comprados':
        await this.driver.findElement(this.selectors.completedProductsTab).click();
        break;
    }
    return this;
  }

  // Método para verificar si un producto existe en la lista
  async isProductVisible(name) {
    try {
      await this.driver.wait(until.elementLocated(this.selectors.productName(name)), 5000);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Método para obtener el número de productos en la lista
  async getProductCount() {
    const products = await this.driver.findElements(this.selectors.productItems);
    return products.length;
  }

  // Método para esperar a que se cargue la página
  async waitForPageToLoad() {
    await this.driver.wait(until.elementLocated(this.selectors.addButton), 10000);
    return this;
  }
}

module.exports = ShoppingListPage;