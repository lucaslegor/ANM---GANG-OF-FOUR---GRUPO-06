const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const https = require('https');

const imagePath = path.join(__dirname, '../public/ar-data/marker-image.jpg');
const pdfPath = path.join(__dirname, '../public/ar-data/marker.pdf');

// Verificar si la imagen existe
if (!fs.existsSync(imagePath)) {
  console.log('⚠️ La imagen no existe. Por favor, descarga marker-image.jpg primero.');
  process.exit(1);
}

// Crear PDF
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

// Pipe PDF a archivo
const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Título
doc.fontSize(24)
   .text('Marcador de Realidad Aumentada', { align: 'center' })
   .moveDown(0.5);

doc.fontSize(16)
   .fillColor('#666666')
   .text('Simulador de Crecimiento Bacteriano', { align: 'center' })
   .moveDown(2);

// Agregar imagen del marcador (centrada)
const imageWidth = 500;
const imageHeight = 500;
const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
const x = (pageWidth - imageWidth) / 2 + doc.page.margins.left;

doc.image(imagePath, x, doc.y, {
  width: imageWidth,
  height: imageHeight,
  align: 'center'
});

doc.moveDown(2);

// Instrucciones
doc.fontSize(14)
   .fillColor('#000000')
   .text('Instrucciones de Uso:', { underline: true })
   .moveDown(0.5);

doc.fontSize(12)
   .fillColor('#333333')
   .list([
     'Imprime este marcador en papel blanco, tamaño A4',
     'No escales el marcador - usa el tamaño original (100%)',
     'Mantén el marcador plano y sin arrugas',
     'Usa buena iluminación al apuntar la cámara al marcador',
     'Mantén el marcador estable y completamente visible',
     'Distancia recomendada: 30-50 cm entre cámara y marcador'
   ], {
     bulletRadius: 3,
     textIndent: 15,
     lineGap: 8
   });

doc.moveDown(1);

doc.fontSize(10)
   .fillColor('#666666')
   .text('Nota: Este marcador funciona con la aplicación de Realidad Aumentada del simulador. Escanea el código QR desde el simulador para comenzar.', {
     align: 'justify'
   });

// Finalizar PDF
doc.end();

stream.on('finish', () => {
  console.log('✓ PDF del marcador creado exitosamente en public/ar-data/marker.pdf');
  console.log(`  Tamaño del archivo: ${(fs.statSync(pdfPath).size / 1024).toFixed(2)} KB`);
});

stream.on('error', (err) => {
  console.error('Error creando PDF:', err);
});

