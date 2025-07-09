<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nuevo Documento PDF</title>
  <!-- TinyMCE CDN -->
  <!-- <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js"></script> <!-- local -->
  <script>
    tinymce.init({
      selector: '#editor',
      height: 300,
      menubar: false
    });
  </script>
</head>
<body>
  <h1>Crear nuevo documento</h1>
  <form action="../src/generate_pdf.php" method="POST" enctype="multipart/form-data">
    <label>Encabezado:</label><br>
    <input type="text" name="header" required style="width:100%"><br><br>

    <label>Contenido:</label><br>
    <textarea id="editor" name="texto"></textarea><br><br>

    <label>Pie de página:</label><br>
    <input type="text" name="footer" required style="width:100%"><br><br>

    <button type="submit">Guardar y Generar PDF</button>

    <label>Imagen del encabezado:</label>
<input type="file" name="header_img"><br><br>

...

<label>Imagen del pie de página:</label>
<input type="file" name="footer_img"><br><br>
  </form>

  <br>
  <a href="list.php">→ Ver documentos existentes</a>
</body>
</html>