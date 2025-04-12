# Lista de Compras
![image](https://github.com/user-attachments/assets/9a76e4c4-24d2-43eb-92a0-2450fd2bbd71)

#Link https://lista-de-compra-delta.vercel.app/
## Descripción General

**Lista de Compras** es una aplicación web moderna y responsiva diseñada para ayudar a los usuarios a gestionar eficientemente sus compras diarias. La aplicación permite crear, organizar y dar seguimiento a los productos que necesitas comprar, con una interfaz intuitiva y fácil de usar.

Esta aplicación está diseñada siguiendo los principios de responsabilidad única (SRP) y utiliza tecnologías modernas para ofrecer una experiencia de usuario fluida y agradable, con persistencia de datos en el navegador.

## Características Principales

- ✅ **Gestión completa de productos** (CRUD):
  - Agregar nuevos productos con nombre, cantidad, unidad y categoría
  - Marcar productos como comprados
  - Editar detalles de productos existentes
  - Eliminar productos individuales o todos los comprados

- 🔍 **Filtrado y ordenación avanzados**:
  - Filtrar por categoría (Frutas, Lácteos, Limpieza, etc.)
  - Filtrar por estado (pendientes, comprados, todos)
  - Ordenar por nombre, categoría o fecha de creación
  - Cambiar entre orden ascendente y descendente

- 📊 **Estadísticas y seguimiento**:
  - Visualización del progreso de compras
  - Distribución de productos por categoría
  - Porcentaje de productos comprados

- 💾 **Persistencia de datos**:
  - Almacenamiento automático en localStorage
  - Recuperación de datos al recargar la página

- 📱 **Diseño responsivo**:
  - Adaptable a dispositivos móviles, tablets y escritorio
  - Interfaz optimizada para diferentes tamaños de pantalla

## Tecnologías Utilizadas

- **Frontend**:
  - [Next.js](https://nextjs.org/) - Framework de React con renderizado del lado del servidor
  - [React](https://reactjs.org/) - Biblioteca para construir interfaces de usuario
  - [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
  - [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizables
  - [Lucide React](https://lucide.dev/) - Iconos modernos para React

- **Almacenamiento**:
  - [Web Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API) (localStorage) - Para persistencia de datos en el navegador

## Arquitectura del Sistema

La aplicación está construida siguiendo el principio de responsabilidad única (SRP), con una clara separación de preocupaciones:

1. **Componentes de UI**: Responsables únicamente de la presentación
   - Componentes pequeños y reutilizables
   - Cada componente tiene una única responsabilidad

2. **Hooks personalizados**: Encapsulan la lógica de negocio
   - `useProductos`: Gestiona las operaciones CRUD de productos
   - `useFiltros`: Maneja la lógica de filtrado y ordenación
   - `useLocalStorage`: Abstrae la persistencia de datos

3. **Utilidades**: Funciones puras para cálculos y transformaciones
   - Funciones para calcular estadísticas
   - Transformación de datos

4. **Tipos y constantes**: Definiciones centralizadas
   - Interfaces TypeScript para garantizar la integridad de los datos
   - Constantes para valores reutilizables

Esta arquitectura permite un código más mantenible, testeable y escalable.

## Roles de Usuario

La aplicación está diseñada principalmente para un solo tipo de usuario:

- **Usuario regular**: Persona que necesita gestionar su lista de compras personal o familiar.

## Historias de Usuario

1. **Como usuario**, quiero agregar productos a mi lista de compras con detalles específicos (nombre, cantidad, unidad, categoría) para recordar exactamente qué necesito comprar.

2. **Como usuario**, quiero marcar productos como comprados para llevar un seguimiento de mi progreso durante las compras.

3. **Como usuario**, quiero editar los detalles de un producto en caso de que necesite cambiar la cantidad o alguna otra información.

4. **Como usuario**, quiero eliminar productos que ya no necesito o todos los que ya he comprado para mantener mi lista organizada.

5. **Como usuario**, quiero filtrar y ordenar mis productos para encontrar rápidamente lo que estoy buscando.

6. **Como usuario**, quiero ver estadísticas sobre mi lista de compras para tener una visión general de mi progreso y distribución por categorías.

7. **Como usuario**, quiero que mis datos se guarden automáticamente para no perder mi lista si cierro el navegador o recargo la página.

## Instalación y Configuración

### Requisitos previos

- Node.js (v14.0.0 o superior)
- npm o yarn

### Pasos de instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/lista-compras.git
   cd lista-compras


   Instala las dependencias:

```shellscript
npm install
# o
yarn install
```


Inicia el servidor de desarrollo:

```shellscript
npm run dev
# o
yarn dev
```
### Estructura de Carpetas

![image](https://github.com/user-attachments/assets/11e39096-0e0c-45aa-9922-635dc31c3e17)
