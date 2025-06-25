# Ejemplo: TinyMCE + html2pdf.js

Este ejemplo muestra cómo usar el editor TinyMCE para crear contenido enriquecido y exportarlo a PDF usando la librería [html2pdf.js](https://github.com/eKoopmans/html2pdf.js).

## ¿Cómo funciona?

- TinyMCE permite editar texto con formato, imágenes, tablas, listas, etc.
- Al hacer clic en "Exportar a PDF", el contenido HTML del editor se convierte a PDF usando html2pdf.js y se descarga automáticamente.

## Ventajas

- Fácil de integrar en cualquier proyecto web.
- Permite exportar la mayoría del formato visual (negrita, listas, tablas, imágenes).
- No requiere backend, todo funciona en el navegador.

## Limitaciones

- html2pdf.js usa html2canvas, por lo que el PDF es una "foto" del HTML, no texto real seleccionable en todos los casos.
- No soporta 100% de CSS avanzado (algunos estilos pueden perderse).
- No es ideal para documentos muy largos o con mucho contenido multimedia.

## ¿Cuándo usarlo?

- Cuando necesitas una solución rápida y sencilla para exportar contenido visual a PDF desde el navegador.
- Para prototipos, reportes simples, o cuando no se requiere fidelidad exacta al HTML original.

## ¿Cuándo NO usarlo?

- Si necesitas PDFs con formato profesional, encabezados/pies de página repetidos, o soporte total de CSS.
- Si necesitas guardar el PDF en el servidor (esto solo descarga en el navegador).

## Archivos

- `index.html`: Interfaz y carga de librerías.
- `main.js`: Lógica de integración TinyMCE + html2pdf.js.

---