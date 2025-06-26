const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/generar-pdf', async (req, res) => {
  const html = req.body.html;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '25mm', bottom: '25mm', left: '20mm', right: '20mm' }
  });
  await browser.close();
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="documento.pdf"'
  });
  res.send(pdfBuffer);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});