// Inicializa TinyMCE en el textarea
tinymce.init({
  selector: '#editor',
  height: 400,
  menubar: true,
  plugins: 'lists link image table code',
  toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | code',
  content_style: "body { font-family:Arial,sans-serif; font-size:14px }"
});

// Botón para mostrar el HTML generado por el editor
document.getElementById('btnObtenerHTML').addEventListener('click', function() {
  const contenido = tinymce.get('editor').getContent();
  document.getElementById('salida').textContent = contenido;
});