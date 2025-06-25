// Array de clientes
const clientes = [
  { cedula: "1723456789", nombres: "Sebastián Romero", estadoCivil: "Soltero" },
  { cedula: "1712345678", nombres: "Vicky Castillo", estadoCivil: "Casada" },
  { cedula: "0923456781", nombres: "Andrés Romero", estadoCivil: "Soltero" },
  { cedula: "1109876543", nombres: "Víctor Álvarez", estadoCivil: "Divorciado" },
  { cedula: "0801234567", nombres: "Abraham Mazavanda", estadoCivil: "Casado" },
  { cedula: "0609876543", nombres: "Esteban Villegas", estadoCivil: "Viudo" },
  { cedula: "0501234987", nombres: "Esteban Quijia", estadoCivil: "Soltero" },
  { cedula: "0912345678", nombres: "Javier Paredes", estadoCivil: "Casado" },
  { cedula: "1809876543", nombres: "Patricia Sotalin", estadoCivil: "Soltera" },
  { cedula: "1201234567", nombres: "Camila Sandoval", estadoCivil: "Casada" }
];

// Llenar el select de clientes y mostrar datos
window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('selectCliente');
  if (select) {
    clientes.forEach((c, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${c.nombres} (${c.cedula})`;
      select.appendChild(opt);
    });
    mostrarDatosCliente(0);
    select.addEventListener('change', e => mostrarDatosCliente(e.target.value));
  }

  // Valores por defecto al cargar la página
  document.getElementById('tipoDocumento').value = "Informe";
  document.getElementById('tamanoPapel').value = "A4";
  document.getElementById('orientacionPapel').value = "Vertical";
  document.getElementById('margenSuperior').value = 25;
  document.getElementById('margenInferior').value = 25;
  document.getElementById('margenIzquierda').value = 20;
  document.getElementById('margenDerecha').value = 20;
});

function mostrarDatosCliente(idx) {
  const c = clientes[idx];
  document.getElementById('clienteCedula').value = c.cedula;
  document.getElementById('clienteNombres').value = c.nombres;
  document.getElementById('clienteEstadoCivil').value = c.estadoCivil;
}

// Helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const editor  = $('#editor');

// Toolbar principal
$$('[data-cmd]').forEach(btn => {
  btn.addEventListener('click', e => {
    const { cmd } = e.currentTarget.dataset;
    if (cmd === 'createLink') {
      const url = prompt('URL del enlace');
      if (url) document.execCommand(cmd, false, url);
    } else if (cmd === 'insertImage') {
      const url = prompt('URL de la imagen');
      if (url) document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, null);
    }
    updateStatus();
  });
});

// Fuente y tamaño de letra
$('#fontNameSelect').addEventListener('change', function(e) {
  document.execCommand('fontName', false, e.target.value);
});
$('#fontSizeSelect').addEventListener('change', function(e) {
  document.execCommand('fontSize', false, e.target.value);
});

// Estado barra
const pathEl  = $('#dom-path');
const wordEl  = $('#word-count');

function updateStatus() {
  let node = getSelection().anchorNode;
  if (node) {
    let tags = [];
    while (node && node.nodeType === 1 && node.id !== 'editor') {
      tags.unshift(node.nodeName.toLowerCase());
      node = node.parentNode;
    }
    pathEl.textContent = `Ruta: ${tags.join(' > ') || 'body'}`;
  }
  const text = editor.textContent.trim();
  wordEl.textContent = `Palabras: ${text ? text.split(/\s+/).length : 0}`;
}

editor.addEventListener('keyup', updateStatus);
editor.addEventListener('click', updateStatus);
editor.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.shiftKey) document.execCommand('insertLineBreak');
});
updateStatus();

// Arrastrar imágenes
editor.addEventListener('dragover', e => e.preventDefault());
editor.addEventListener('drop', async e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      document.execCommand('insertImage', false, evt.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Subir imagen desde archivo local
document.getElementById('inputImagen').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    document.execCommand('insertImage', false, evt.target.result);
    e.target.value = '';
  };
  reader.readAsDataURL(file);
});

// Función para obtener el CSS de márgenes y orientación
function getEstiloDocumento() {
  const sup = document.getElementById('margenSuperior').value || 25;
  const inf = document.getElementById('margenInferior').value || 25;
  const izq = document.getElementById('margenIzquierda').value || 20;
  const der = document.getElementById('margenDerecha').value || 20;
  const orientacion = document.getElementById('orientacionPapel').value || "Vertical";
  const fuente = document.getElementById('fontNameSelect').value || "Arial";
  // Medidas en mm para CSS y fuente
  return `
    margin-top:${sup}mm;
    margin-bottom:${inf}mm;
    margin-left:${izq}mm;
    margin-right:${der}mm;
    ${orientacion === "Horizontal" ? "width:297mm;height:210mm;" : "width:210mm;height:297mm;"}
    font-family:'${fuente}', Arial, sans-serif;
  `;
}

// Función para obtener el bloque de datos de la plantilla
function getDatosPlantillaHTML() {
  const nombre = document.getElementById('nombrePlantilla').value || '';
  const asignado = document.getElementById('asignadoA').value || '';
  return `
    <div style="background:#e3f0fa;border:1px solid #b3d8f7;padding:10px 16px;margin-bottom:16px;border-radius:8px;">
      <b>Nombre de la plantilla:</b> ${nombre}<br>
      <b>Asignado a:</b> ${asignado}
    </div>
  `;
}

// ========== FUNCIONES PARA LOS BOTONES DE ACCIONES ==========

// Insertar campo
document.getElementById('btnInsertarCampo').addEventListener('click', function() {
  document.execCommand('insertText', false, '{{CAMPO}}');
  editor.focus();
});

// Vista previa (modal Bootstrap)
document.getElementById('btnVistaPrevia').addEventListener('click', function() {
  const header = document.getElementById('headerArea').innerHTML;
  const footer = document.getElementById('footerArea').innerHTML;
  const contenido = document.getElementById('editor').innerHTML;
  const idx = document.getElementById('selectCliente').value;
  const cliente = clientes[idx];
  const datosCliente = `<p><b>Cédula:</b> ${cliente.cedula}<br>
                        <b>Nombres:</b> ${cliente.nombres}<br>
                        <b>Estado Civil:</b> ${cliente.estadoCivil}</p><hr>`;
  const datosPlantilla = getDatosPlantillaHTML();
  const estiloDocumento = getEstiloDocumento();
  const html = `
    <div style="${estiloDocumento}">
      ${datosPlantilla}
      <div class="word-header" style="border-bottom:2px solid #888;background:#f3f3f3;text-align:center;padding:8px 0 4px 0;font-size:1.1em;font-weight:bold;margin-bottom:16px;">${header}</div>
      ${datosCliente}
      <div>${contenido}</div>
      <div class="word-footer" style="border-top:2px solid #888;background:#f3f3f3;text-align:center;padding:4px 0 8px 0;font-size:1em;margin-top:24px;">${footer}</div>
    </div>
  `;
  document.getElementById('previewContent').innerHTML = html;
  const modal = new bootstrap.Modal(document.getElementById('modalVistaPrevia'));
  modal.show();
});

// Exportar PDF
document.getElementById('btnExportarPDF').addEventListener('click', function() {
  const header = document.getElementById('headerArea').innerText;
  const footer = document.getElementById('footerArea').innerText;
  const contenido = document.getElementById('editor').innerText;
  const idx = document.getElementById('selectCliente').value;
  const cliente = clientes[idx];
  const datosCliente = `Cédula: ${cliente.cedula}\nNombres: ${cliente.nombres}\nEstado Civil: ${cliente.estadoCivil}\n\n`;
  const nombre = document.getElementById('nombrePlantilla').value || '';
  const asignado = document.getElementById('asignadoA').value || '';
  const datosPlantilla = 
    `Nombre de la plantilla: ${nombre}\n` +
    `Asignado a: ${asignado}\n\n`;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(10);
  doc.text(datosPlantilla, 10, y);
  y += 20;
  doc.setFontSize(14);
  doc.text(header, 105, y, { align: "center" });
  y += 10;
  doc.setFontSize(10);
  doc.text(datosCliente, 10, y);
  y += 20;
  doc.setFontSize(12);
  doc.text(contenido, 10, y);
  y += 60;
  doc.setFontSize(10);
  doc.text(footer, 105, 280, { align: "center" });
  doc.save("documento.pdf");
});

// Imprimir
document.getElementById('btnImprimir').addEventListener('click', function() {
  const header = document.getElementById('headerArea').innerHTML;
  const footer = document.getElementById('footerArea').innerHTML;
  const contenido = document.getElementById('editor').innerHTML;
  const idx = document.getElementById('selectCliente').value;
  const cliente = clientes[idx];
  const datosCliente = `<p><b>Cédula:</b> ${cliente.cedula}<br>
                        <b>Nombres:</b> ${cliente.nombres}<br>
                        <b>Estado Civil:</b> ${cliente.estadoCivil}</p><hr>`;
  const datosPlantilla = getDatosPlantillaHTML();
  const estiloDocumento = getEstiloDocumento();
  const html = `
    <div style="${estiloDocumento}">
      ${datosPlantilla}
      <div class="word-header" style="border-bottom:2px solid #888;background:#f3f3f3;text-align:center;padding:8px 0 4px 0;font-size:1.1em;font-weight:bold;margin-bottom:16px;">${header}</div>
      ${datosCliente}
      <div>${contenido}</div>
      <div class="word-footer" style="border-top:2px solid #888;background:#f3f3f3;text-align:center;padding:4px 0 8px 0;font-size:1em;margin-top:24px;">${footer}</div>
    </div>
  `;
  const win = window.open('', '', 'width=900,height=700');
  win.document.write('<html><head><title>Imprimir</title><meta charset="UTF-8"></head><body>' + html + '</body></html>');
  win.document.close();
  win.focus();
  win.print();
  setTimeout(() => win.close(), 1000);
});

// Guardar (descargar como HTML)
document.getElementById('btnGuardar').addEventListener('click', function() {
  const header = document.getElementById('headerArea').innerHTML;
  const footer = document.getElementById('footerArea').innerHTML;
  const contenido = document.getElementById('editor').innerHTML;
  const idx = document.getElementById('selectCliente').value;
  const cliente = clientes[idx];
  const datosCliente = `<p><b>Cédula:</b> ${cliente.cedula}<br>
                        <b>Nombres:</b> ${cliente.nombres}<br>
                        <b>Estado Civil:</b> ${cliente.estadoCivil}</p><hr>`;
  const datosPlantilla = getDatosPlantillaHTML();
  const estiloDocumento = getEstiloDocumento();
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${document.getElementById('nombrePlantilla').value || 'Plantilla'}</title>
  </head>
  <body>
    <div style="${estiloDocumento}">
      ${datosPlantilla}
      <div class="word-header" style="border-bottom:2px solid #888;background:#f3f3f3;text-align:center;padding:8px 0 4px 0;font-size:1.1em;font-weight:bold;margin-bottom:16px;">${header}</div>
      ${datosCliente}
      <div>${contenido}</div>
      <div class="word-footer" style="border-top:2px solid #888;background:#f3f3f3;text-align:center;padding:4px 0 8px 0;font-size:1em;margin-top:24px;">${footer}</div>
    </div>
  </body>
  </html>
  `;
  const blob = new Blob([html], {type: "text/html;charset=utf-8"});
  saveAs(blob, (document.getElementById('nombrePlantilla').value || 'plantilla') + ".html");
});

// DESCARGA WORD MEJORADA
function descargarWordDocx() {
  const header = document.getElementById('headerArea').innerHTML;
  const footer = document.getElementById('footerArea').innerHTML;
  const contenido = document.getElementById('editor').innerHTML;
  const idx = document.getElementById('selectCliente').value;
  const cliente = clientes[idx];
  const datosCliente = `<p><b>Cédula:</b> ${cliente.cedula}<br>
                        <b>Nombres:</b> ${cliente.nombres}<br>
                        <b>Estado Civil:</b> ${cliente.estadoCivil}</p><hr>`;
  const datosPlantilla = getDatosPlantillaHTML();
  const estiloDocumento = getEstiloDocumento();
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      .word-header {
        border-bottom: 2px solid #888;
        background: #f3f3f3;
        text-align: center;
        padding: 8px 0 4px 0;
        font-size: 1.1em;
        font-weight: bold;
        margin-bottom: 16px;
      }
      .word-footer {
        border-top: 2px solid #888;
        background: #f3f3f3;
        text-align: center;
        padding: 4px 0 8px 0;
        font-size: 1em;
        margin-top: 24px;
      }
    </style>
  </head>
  <body>
    <div style="${estiloDocumento}">
      ${datosPlantilla}
      <div class="word-header">${header}</div>
      ${datosCliente}
      <div>${contenido}</div>
      <div class="word-footer">${footer}</div>
    </div>
  </body>
  </html>
  `;
  const converted = window.htmlDocx.asBlob(html);
  saveAs(converted, 'documento.docx');
}