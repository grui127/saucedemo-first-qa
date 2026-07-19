# 🚀 Saucedemo E2E & API Automation Framework

Framework profesional de pruebas automatizadas diseñado con **Playwright** y **TypeScript**, aplicando el patrón de diseño **Page Object Model (POM)** para la capa de interfaz de usuario, y validaciones directas de backend mediante el core de peticiones de API.

## 🛠️ Tecnologías y Entorno
- **Lenguaje:** TypeScript
- **Framework de Automatización:** Playwright (Última versión)
- **Patrón de Diseño:** Page Object Model (POM)
- **Ecosistema de Gestión:** Jira Software (Tablero Kanban) para el ciclo de vida de los casos de prueba y reporte de incidentes.

## 📁 Estructura del Proyecto
- `/pages`: Clases abstractas de componentes de la UI (`LoginPage`, `ProductsPage`, `CheckoutPage`).
- `/tests`: Scripts de ejecución automatizada tanto funcionales de flujo completo como de endpoints de API.

## 🚀 Cómo ejecutar las pruebas localmente

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install