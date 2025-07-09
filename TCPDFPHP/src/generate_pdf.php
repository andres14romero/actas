<?php
require_once('../tcpdf/tcpdf.php');

// Recoger datos del formulario
$encabezado = $_POST['encabezado'] ?? '';
$cuerpo = $_POST['cuerpo'] ?? '';
$pie = $_POST['pie'] ?? '';

// Guardar imágenes
$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$headerImgPath = '';
if (!empty($_FILES['header_img']['name'])) {
    $headerTmp = $_FILES['header_img']['tmp_name'];
    $headerName = basename($_FILES['header_img']['name']);
    $headerImgPath = $uploadDir . 'header_' . time() . '_' . $headerName;
    move_uploaded_file($headerTmp, $headerImgPath);
}

$footerImgPath = '';
if (!empty($_FILES['footer_img']['name'])) {
    $footerTmp = $_FILES['footer_img']['tmp_name'];
    $footerName = basename($_FILES['footer_img']['name']);
    $footerImgPath = $uploadDir . 'footer_' . time() . '_' . $footerName;
    move_uploaded_file($footerTmp, $footerImgPath);
}

// Crear PDF
$pdf = new TCPDF();
$pdf->AddPage();

// Imagen del encabezado
if ($headerImgPath) {
    $pdf->Image($headerImgPath, 10, 10, 50);
    $pdf->Ln(25); // Espacio debajo de la imagen
}

// Encabezado textual
$pdf->SetFont('helvetica', 'B', 16);
$pdf->SetXY(10, 40);
$pdf->Cell(0, 10, $encabezado, 0, 1);

// Cuerpo HTML
$pdf->SetFont('helvetica', '', 12);
$pdf->SetXY(10, 60); // Posición ajustada
$pdf->writeHTMLCell(0, 0, '', '', $cuerpo, 0, 1);

// Imagen del pie de página
if ($footerImgPath) {
    $pdf->SetY(-45);
    $pdf->Image($footerImgPath, 10, $pdf->GetY(), 50);
    $pdf->Ln(15);
}

// Pie de página textual
$pdf->SetFont('helvetica', 'I', 10);
$pdf->SetY(-25);
$pdf->Cell(0, 10, $pie, 0, 0, 'C');

// Mostrar PDF en el navegador
$pdf->Output('documento.pdf', 'I');
?>