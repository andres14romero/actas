<?php
require 'config.php';
require '../vendor/autoload.php';

// use TCPDF;
$pdf = new TCPDF();

$id = $_GET['id'] ?? null;

if (!$id) {
  die("ID inválido.");
}

// 1. Obtener el contenido de la base
$stmt = $pdo->prepare("
  SELECT t.texto, h.header, h.footer
  FROM texto t
  JOIN header_footer h ON h.texto_id = t.id
  WHERE t.id = :id
");
$stmt->execute(['id' => $id]);
$data = $stmt->fetch();

if (!$data) {
  die("Documento no encontrado.");
}

// 2. Crear PDF
$pdf = new TCPDF();
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor("Andrés");
$pdf->SetTitle("Documento $id");
$pdf->SetMargins(15, 25, 15);
$pdf->SetHeaderMargin(10);
$pdf->SetFooterMargin(15);
$pdf->SetAutoPageBreak(true, 20);

// Encabezado y pie personalizados
class MYPDF extends TCPDF {
  public $customHeader = '';
  public $customFooter = '';

  public function Header() {
    $this->SetFont('helvetica', 'B', 12);
    $this->Cell(0, 10, $this->customHeader, 0, 1, 'C');
  }

  public function Footer() {
    $this->SetY(-15);
    $this->SetFont('helvetica', 'I', 10);
    $this->Cell(0, 10, $this->customFooter, 0, 0, 'C');
  }
}

$pdf = new MYPDF();
$pdf->customHeader = $data['header'];
$pdf->customFooter = $data['footer'];

$pdf->AddPage();

// Contenido del editor (HTML)
$html = $data['texto'];
$pdf->writeHTML($html, true, false, true, false, '');

// 3. Descargar
$pdf->Output("documento_$id.pdf", 'D');