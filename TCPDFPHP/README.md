TCPDFPHP

Formulario web en PHP con editor enriquecido (TinyMCE) y generación de documentos PDF utilizando la librería TCPDF.

Funcionalidades principales

- Formulario con campos: Encabezado, Cuerpo (TinyMCE), Pie de página
- Generación automática de documentos PDF desde el navegador
- Diseño estructurado para integración con base de datos (MySQL/MariaDB)
- Organización del proyecto en carpetas: `public/`, `src/`, `sql/`
- Compatible con entornos locales XAMPP (Apache, MariaDB y PHP)




Requisitos

- XAMPP instalado (recomendado PHP 8.2+)
- Apache y MySQL activos
- Navegador moderno (Chrome, Firefox, Edge)

---

Instalación local

1. Clona el repositorio dentro de:
C:\xampp\htdocs\actas\

2. Ubicación esperada del proyecto:
C:\xampp\htdocs\actas\TCPDFPHP\


3. Desde el Panel de XAMPP:
- Inicia Apache y MySQL

4. Accede al proyecto desde el navegador:
http://localhost/actas/TCPDFPHP/public/index.php


Base de datos

1. Accede a [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Crea una base llamada `TCPDFPHP`
3. Importa el archivo SQL desde:
sql/create_tables.sql


*Actualmente se está resolviendo una incidencia en la autenticación MySQL. El proyecto funciona a nivel visual y de generación PDF.


Notas

- La librería TCPDF está integrada sin frameworks externos
- El editor de texto utiliza TinyMCE para formato enriquecido
- El botón “Guardar y generar PDF” produce documentos estructurados automáticamente

 Estado actual


 Interfaz del formulario y exportación de PDF funcionando correctamente  

 Conexión con la base de datos en proceso de reparación técnica (usuario `root`)



Autor

Proyecto realizado por Andrés Romero Castillo
