# Ejemplo: TinyMCE + PDF Backend (Puppeteer)

Este ejemplo muestra cómo usar TinyMCE en el frontend y generar un PDF fiel al HTML usando Puppeteer en el backend (Node.js).

## ¿Cómo funciona?

- El usuario edita el contenido en TinyMCE.
- Al hacer clic en "Exportar a PDF", el HTML se envía al backend.
- Puppeteer abre una instancia de Chromium, renderiza el HTML y genera un PDF idéntico al diseño original.
- El PDF se descarga automáticamente en el navegador.

## Instalación y ejecución

1. Instala las dependencias:
   
   npm install


2. Inicia el servidor:

   node server.js
   
3. Abre tu navegador, acede a http://localhost:3000 y prueba el editor.



## Ventajas

- El PDF respeta casi todo el formato, CSS, imágenes, tablas, etc.
- Permite guardar el PDF en el servidor si se desea (solo cambia el código del endpoint).
- Ideal para documentos profesionales.

## Limitaciones

- Requiere Node.js y Puppeteer en el servidor.
- No funciona solo en frontend.

## Archivos

- `public/index.html` y `public/main.js`: Interfaz y lógica frontend.
- `server.js`: Backend con Express y Puppeteer.

---