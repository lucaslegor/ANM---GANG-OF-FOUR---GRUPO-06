// Script para generar marcador AR personalizado
// Ejecutar: node scripts/generate-marker.js

const fs = require('fs');
const path = require('path');

// Crear un marcador simple usando un patrón básico
// En producción, usarías el generador de AR.js:
// https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

const markerInfo = `
# Marcador AR para Simulador de Crecimiento Bacteriano

## Generar Marcador

1. Visita: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Sube una imagen personalizada o usa un patrón predefinido
3. Descarga el archivo .patt generado
4. Colócalo en public/ar-data/marker.patt

## Crear PDF del Marcador

1. Usa el generador de AR.js para crear una imagen del marcador
2. Convierte la imagen a PDF
3. Colócalo en public/ar-data/marker.pdf

## Marcador Predefinido

Puedes usar el marcador Hiro de AR.js como alternativa:
- Descarga desde: https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/data/hiro.patt
- Renómbralo a marker.patt
`;

console.log(markerInfo);

// Crear directorio si no existe
const arDataDir = path.join(__dirname, '../public/ar-data');
if (!fs.existsSync(arDataDir)) {
  fs.mkdirSync(arDataDir, { recursive: true });
}

console.log('\n✓ Directorio public/ar-data creado');
console.log('✓ Sigue las instrucciones arriba para generar los archivos del marcador');

