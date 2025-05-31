<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Formulario de Acta</title>
</head>
<body>
    <h2>Formulario para generar acta</h2>
    <form action="generar_acta.php" method="POST">
        <label>Fecha:</label><br>
        <input type="date" name="fecha" required><br><br>

        <label>Lugar:</label><br>
        <input type="text" name="lugar" required><br><br>

        <label>Asistentes:</label><br>
        <textarea name="asistentes" rows="4" cols="50" required></textarea><br><br>

        <label>Temas Tratados:</label><br>
        <textarea name="temas" rows="4" cols="50" required></textarea><br><br>

        <label>Conclusiones:</label><br>
        <textarea name="conclusiones" rows="4" cols="50" required></textarea><br><br>

        <input type="submit" value="Generar Acta">
    </form>
</body>
</html>
