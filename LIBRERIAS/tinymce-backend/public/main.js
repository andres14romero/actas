tinymce.init({
  selector: '#editor',
  height: 400,
  menubar: true,
  plugins: 'lists link image table code',
  toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | code',
  content_style: "body { font-family:Arial,sans-serif; font-size:14px }"
});

document.getElementById('btnExportarPDF').addEventListener('click', async function() {
  const contenido = tinymce.get('editor').getContent();
  const res = await fetch('/generar-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html: contenido })
  });
  if (res.ok) {
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    document.getElementById('mensaje').innerText = "PDF generado y descargado.";
  } else {
    document.getElementById('mensaje').innerText = "Error al generar PDF.";
  }
});