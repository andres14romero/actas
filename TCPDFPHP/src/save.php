<?php
require '../src/config.php';

$header = $_POST['header'] ?? '';
$texto  = $_POST['texto']  ?? '';
$footer = $_POST['footer'] ?? '';

if (!$header || !$texto || !$footer) {
  die("Faltan datos.");
}

$stmt1 = $pdo->prepare("INSERT INTO texto (texto) VALUES (:texto)");
$stmt1->execute(['texto' => $texto]);
$texto_id = $pdo->lastInsertId();

$stmt2 = $pdo->prepare("INSERT INTO header_footer (header, footer, texto_id) VALUES (:header, :footer, :texto_id)");
$stmt2->execute([
  'header'   => $header,
  'footer'   => $footer,
  'texto_id' => $texto_id
]);

header('Location: list.php');
exit;