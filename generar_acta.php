<?php
require_once 'vendor/autoload.php';

use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;

// Obtener los datos del formulario
$fecha = $_POST['fecha'];
$lugar = $_POST['lugar'];
$asistentes = $_POST['asistentes'];
$temas = $_POST['temas'];
$conclusiones = $_POST['conclusiones'];

// Crear nuevo documento Word
$phpWord = new PhpWord();
$section = $phpWord->addSection();
$section->addText("ACTA DE REUNIÓN", ['bold' => true, 'size' => 16]);
$section->addText("Fecha: $fecha");
$section->addText("Lugar: $lugar");
$section->addText(" ");
$section->addText("Asistentes:", ['bold' => true]);
$section->addText($asistentes);
$section->addText(" ");
$section->addText("Temas Tratados:", ['bold' => true]);
$section->addText($temas);
$section->addText(" ");
$section->addText("Conclusiones:", ['bold' => true]);
$section->addText($conclusiones);

// Guardar el archivo
$nombreArchivo = "acta_" . date("Ymd_His") . ".docx";
$writer = IOFactory::createWriter($phpWord, 'Word2007');
$writer->save($nombreArchivo);

// Descargar automáticamente
header("Content-Description: File Transfer");
header("Content-Disposition: attachment; filename=$nombreArchivo");
header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
header("Content-Transfer-Encoding: binary");
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
readfile($nombreArchivo);
exit;
?>
