# Historias de Usuario para la Aplicación Lista de Compras

## Historia de Usuario 1: Añadir productos a la lista de compras

**Como** usuario de la aplicación Lista de Compras,  
**Quiero** poder añadir nuevos productos a mi lista de compras,  
**Para** recordar qué necesito comprar cuando vaya al supermercado.

### Criterios de Aceptación:
- Debe existir un formulario con campos para el nombre del producto, cantidad y categoría
- El formulario debe incluir un botón "Añadir" que agregue el producto a la lista
- Al añadir un producto, debe aparecer inmediatamente en la lista de productos
- El producto añadido debe mostrar correctamente su nombre, cantidad y categoría
- El formulario debe limpiarse después de añadir un producto

### Criterios de Rechazo:
- No se debe poder añadir un producto sin nombre
- No se debe poder añadir un producto con un nombre que ya existe en la lista
- No se debe aceptar cantidades negativas para los productos

## Historia de Usuario 2: Marcar productos como comprados

**Como** usuario de la aplicación Lista de Compras,  
**Quiero** poder marcar productos como comprados,  
**Para** tener un seguimiento visual de lo que ya he adquirido.

### Criterios de Aceptación:
- Cada producto en la lista debe tener un checkbox para marcarlo como comprado
- Al marcar un producto como comprado, debe cambiar visualmente su apariencia (tachado o algún otro indicador)
- El progreso de la compra debe actualizarse en tiempo real
- Debe ser posible desmarcar un producto previamente marcado como comprado

### Criterios de Rechazo:
- No debe cambiar el estado de un producto diferente al que se ha marcado
- No debe perderse el estado de los productos al refrescar la página

## Historia de Usuario 3: Eliminar productos de la lista

**Como** usuario de la aplicación Lista de Compras,  
**Quiero** poder eliminar productos de mi lista,  
**Para** mantener mi lista organizada y eliminar productos que ya no necesito.

### Criterios de Aceptación:
- Cada producto debe tener un botón para eliminarlo
- Al hacer clic en el botón de eliminar, debe aparecer un diálogo de confirmación
- Si se confirma, el producto debe desaparecer de la lista
- Si se cancela, el producto debe permanecer en la lista
- El contador de productos y el progreso deben actualizarse después de eliminar

### Criterios de Rechazo:
- No debe eliminarse ningún producto si se cancela la confirmación
- No debe ser posible eliminar un producto sin confirmación previa

## Historia de Usuario 4: Filtrar productos por estado

**Como** usuario de la aplicación Lista de Compras,  
**Quiero** poder filtrar los productos por su estado (todos, pendientes o comprados),  
**Para** poder visualizar mejor los productos que me interesan en cada momento.

### Criterios de Aceptación:
- Debe haber tabs o botones para filtrar los productos por: "Todos", "Pendientes" y "Comprados"
- Al hacer clic en "Pendientes", solo deben mostrarse los productos no marcados como comprados
- Al hacer clic en "Comprados", solo deben mostrarse los productos marcados como comprados
- Al hacer clic en "Todos", deben mostrarse todos los productos sin importar su estado

### Criterios de Rechazo:
- Los filtros no deben afectar el estado actual de los productos
- No debe perderse ningún producto al cambiar entre filtros

## Historia de Usuario 5: Ver estadísticas de la lista de compras

**Como** usuario de la aplicación Lista de Compras,  
**Quiero** poder ver estadísticas sobre mi lista de compras,  
**Para** tener una visión general del progreso de mi compra.

### Criterios de Aceptación:
- Debe mostrarse el número total de productos en la lista
- Debe mostrarse el número de productos pendientes por comprar
- Debe mostrarse el número de productos ya comprados
- Debe haber una barra de progreso visual que indique el porcentaje de productos comprados
- Las estadísticas deben actualizarse automáticamente al añadir, marcar o eliminar productos

### Criterios de Rechazo:
- Las estadísticas no deben contabilizar productos que han sido eliminados
- El porcentaje de progreso no debe ser inconsistente con el número de productos comprados