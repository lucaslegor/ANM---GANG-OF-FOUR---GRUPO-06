const fs = require('fs');
const path = require('path');
const https = require('https');

// Crear PDF usando un enfoque simple: crear HTML que se puede imprimir como PDF
// O usar una librería si está disponible

const createPDFHTML = () => {
  const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AR Marker - Imprimir</title>
    <style>
        @media print {
            @page {
                size: A4;
                margin: 20mm;
            }
            body {
                margin: 0;
                padding: 0;
            }
        }
        body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .container {
            text-align: center;
            max-width: 800px;
        }
        .title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
        }
        .subtitle {
            font-size: 18px;
            margin-bottom: 30px;
            color: #333;
        }
        .marker-wrapper {
            margin: 30px 0;
            padding: 20px;
            border: 3px solid #000;
            display: inline-block;
            background: white;
        }
        .marker-image {
            width: 100%;
            max-width: 600px;
            height: auto;
            display: block;
        }
        .instructions {
            margin-top: 30px;
            text-align: left;
            font-size: 14px;
            line-height: 1.8;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
        }
        .instructions h3 {
            margin-top: 0;
            color: #000;
        }
        .instructions ol {
            margin: 10px 0;
            padding-left: 25px;
        }
        .instructions li {
            margin: 8px 0;
        }
        @media print {
            .instructions {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">Marcador de Realidad Aumentada</div>
        <div class="subtitle">Simulador de Crecimiento Bacteriano</div>
        
        <div class="marker-wrapper">
            <img src="marker-image.jpg" alt="AR Marker" class="marker-image" />
        </div>
        
        <div class="instructions">
            <h3>Instrucciones de Uso:</h3>
            <ol>
                <li><strong>Imprime este marcador</strong> en papel blanco, tamaño A4</li>
                <li><strong>No escales el marcador</strong> - usa el tamaño original (100%)</li>
                <li><strong>Mantén el marcador plano</strong> y sin arrugas</li>
                <li><strong>Usa buena iluminación</strong> al apuntar la cámara al marcador</li>
                <li><strong>Mantén el marcador estable</strong> y completamente visible en la cámara</li>
                <li><strong>Distancias recomendadas:</strong> 30-50 cm entre la cámara y el marcador</li>
            </ol>
            <p><strong>Nota:</strong> Este marcador funciona con la aplicación de Realidad Aumentada del simulador. Escanea el código QR desde el simulador para comenzar.</p>
        </div>
    </div>
</body>
</html>`;

  const outputPath = path.join(__dirname, '../public/ar-data/marker.html');
  fs.writeFileSync(outputPath, html);
  console.log('✓ HTML del marcador creado en public/ar-data/marker.html');
  console.log('  Puedes abrir este archivo en un navegador e imprimirlo como PDF');
  
  return outputPath;
};

// Verificar si la imagen existe
const imagePath = path.join(__dirname, '../public/ar-data/marker-image.jpg');
if (!fs.existsSync(imagePath)) {
  console.log('⚠️ La imagen del marcador no existe. Descargándola...');
  
  https.get('https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/images/HIRO.jpg', (res) => {
    const file = fs.createWriteStream(imagePath);
    res.pipe(file);
    file.on('finish', () => {
      console.log('✓ Imagen del marcador descargada');
      createPDFHTML();
    });
  }).on('error', (err) => {
    console.error('Error descargando imagen:', err);
  });
} else {
  console.log('✓ Imagen del marcador encontrada');
  createPDFHTML();
}

