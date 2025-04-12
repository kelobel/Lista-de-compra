# Pruebas Automatizadas - Lista de Compras

Este proyecto contiene pruebas automatizadas para la aplicación "Lista de Compras" utilizando Selenium WebDriver con JavaScript y Mocha.

## Requisitos previos

- Node.js (versión 14 o superior)
- NPM (gestor de paquetes de Node.js)
- Google Chrome
- ChromeDriver (incluido en la ruta: C:\Users\kelov\Desktop\chrome-win64)

## Estructura del proyecto

```
tests/
├── reports/           # Directorio donde se generan los reportes HTML
│   └── screenshots/   # Capturas de pantalla de las pruebas
├── selenium/
│   ├── config/        # Configuración de Selenium WebDriver
│   ├── pages/         # Objetos de página (Page Objects)
│   ├── tests/         # Casos de prueba
│   ├── user-stories.md # Historias de usuario
│   └── utils/         # Utilidades (capturas de pantalla, etc.)
```

## Historias de Usuario

Las pruebas están basadas en las historias de usuario definidas en el archivo `tests/selenium/user-stories.md`. Estas historias representan los requisitos funcionales de la aplicación y sirven como base para los casos de prueba automatizados.

## Cómo ejecutar las pruebas

1. Asegúrate de que la aplicación de Lista de Compras esté ejecutándose en el puerto 3000:

```
npm run dev
```

2. En otra terminal, ejecuta las pruebas automatizadas:

```
npm test
```

3. Al finalizar, se generará un reporte HTML detallado en el directorio `tests/reports/`.

## Reportes generados

- **HTML Report**: Se genera un reporte detallado en formato HTML con Mochawesome, que muestra los resultados de cada prueba ejecutada.
- **Capturas de pantalla**: Se generan capturas de pantalla automáticas para cada caso de prueba, tanto si pasa como si falla, en el directorio `tests/reports/screenshots/`.

## Pruebas implementadas

Las pruebas automatizadas verifican las siguientes funcionalidades:

1. **Historia de Usuario 1**: Añadir productos a la lista de compras
2. **Historia de Usuario 2**: Marcar productos como comprados
3. **Historia de Usuario 3**: Eliminar productos de la lista
4. **Historia de Usuario 4**: Filtrar productos por estado
5. **Historia de Usuario 5**: Ver estadísticas de la lista de compras

Cada historia de usuario tiene criterios de aceptación y rechazo definidos, y las pruebas automatizadas verifican el cumplimiento de estos criterios.