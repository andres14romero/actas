# Ejemplo: TCPDF (PHP)

Este módulo muestra cómo generar un PDF en el backend usando la librería TCPDF en PHP.

## ¿Cómo funciona?

- TCPDF permite crear archivos PDF a partir de HTML y CSS básico.
- Puedes cargar una plantilla HTML y convertirla en PDF.
- El PDF puede descargarse, mostrarse en el navegador o guardarse en el servidor.

## Ventajas

- 100% PHP, fácil de integrar en proyectos web.
- Soporta tablas, imágenes, firmas, encabezados y pies de página.
- Permite personalizar márgenes, tamaño de página, etc.

## Desventajas

- El soporte de CSS es limitado (no soporta todo el CSS moderno).
- El renderizado puede diferir del HTML original.
- No soporta JavaScript ni CSS avanzado.

## Archivos

- `index.php`: Código PHP que genera el PDF.
- `plantilla.html`: Plantilla HTML de ejemplo.
- `tcpdf/`: Carpeta con la librería TCPDF (descargar de https://tcpdf.org/).

# Ejemplo TCPDF (PHP)

## Requisitos

- Servidor local (XAMPP, WAMP, etc.)
- PHP 7.x o superior

## Instrucciones

1. Descarga la librería TCPDF desde [https://github.com/tecnickcom/TCPDF](https://github.com/tecnickcom/TCPDF) y coloca la carpeta `tcpdf` aquí.
2. Copia esta carpeta en `C:/xampp/htdocs/` (o la ruta de tu servidor local).
3. Abre XAMPP y enciende Apache.
4. Accede en tu navegador a:  
   `http://localhost/tcpdf/index.php`

---