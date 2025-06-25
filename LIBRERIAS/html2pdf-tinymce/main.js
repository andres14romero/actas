// Inicializa TinyMCE en el textarea
tinymce.init({
  selector: '#editor',
  height: 400,
  menubar: true,
  plugins: 'lists link image table code',
  toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | code',
  content_style: "body { font-family:Arial,sans-serif; font-size:14px }"
});

// Espera a que TinyMCE esté listo y luego agrega el evento al botón
document.getElementById('btnExportarPDF').addEventListener('click', function() {
  // Obtiene el contenido HTML del editor
  const contenido = tinymce.get('editor').getContent();

  // Crea un contenedor temporal para renderizar el HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = contenido;
  tempDiv.style.background = "#fff";
  tempDiv.style.padding = "20px";
  tempDiv.style.minHeight = "400px";
  tempDiv.style.fontFamily = "Arial, sans-serif";

  // Usa html2pdf.js para exportar el contenido a PDF
  html2pdf()
    .set({
      margin:       10,
      filename:     'documento.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .from(tempDiv)
    .save();
});