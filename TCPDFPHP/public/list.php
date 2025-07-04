<?php
require '../src/config.php';

// Traer todos los textos con su header/footer
$stmt = $pdo->query("
  SELECT t.id, t.creado_en, t.texto, h.header, h.footer
  FROM texto t
  JOIN header_footer h ON h.texto_id = t.id
  ORDER BY t.creado_en DESC
");
$documentos = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Lista de Documentos</title>
</head>
<body>
  <h1>Documentos generados</h1>
  <table border="1" cellpadding="6" cellspacing="0">
    <tr>
      <th>ID</th>
      <th>Creado en</th>
      <th>Encabezado</th>
      <th>Pie</th>
      <th>Acción</th>
    </tr>
    <?php foreach ($documentos as $doc): ?>
    <tr>
      <td><?= $doc['id'] ?></td>
      <td><?= $doc['creado_en'] ?></td>
      <td><?= htmlspecialchars($doc['header']) ?></td>
      <td><?= htmlspecialchars($doc['footer']) ?></td>
      <a href="../src/download.php?id=<?= $doc['id'] ?>">Descargar PDF</a>
    </tr>
    <?php endforeach; ?>
  </table>

  <br>
  
  <a href="index.php">← Crear otro documento</a>
</body>
</html>