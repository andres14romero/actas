<?php
require_once('tcpdf/tcpdf.php');

// Cargar el HTML desde un archivo o variable
$html = file_get_contents('plantilla.html');

// Crear nuevo PDF
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Configuración básica
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Tu Nombre');
$pdf->SetTitle('Ejemplo TCPDF');
$pdf->SetMargins(20, 25, 20); // Izquierda, arriba, derecha
$pdf->SetAutoPageBreak(TRUE, 25); // Pie de página

$pdf->AddPage();

// Escribir el HTML
$pdf->writeHTML($html, true, false, true, false, '');

// Salida: descarga en el navegador
$pdf->Output('ejemplo_tcpdf.pdf', 'I'); // 'I' para mostrar, 'D' para descargar, 'F' para guardar en servidor
?>