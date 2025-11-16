# Archivos AR para Realidad Aumentada

Este directorio contiene los archivos necesarios para la funcionalidad de Realidad Aumentada con tracking de marcadores.

## Archivos necesarios:

1. **camera_para.dat** ✅ - Parámetros de la cámara para AR.js (ya descargado)
2. **marker.patt** ✅ - Patrón del marcador personalizado (ya generado - Marcador Hiro)
3. **marker.pdf** ✅ - Marcador imprimible para usuarios (ya creado)

## Generar archivos:

### camera_para.dat ✅
Ya descargado. Si necesitas actualizarlo:
```bash
curl -o camera_para.dat https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/data/camera_para.dat
```

### marker.patt ✅ COMPLETADO

El marcador Hiro de AR.js ya está descargado y listo para usar.

**Si quieres crear un marcador personalizado:**
1. Visita: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Sube una imagen o usa el generador integrado
3. Descarga el archivo `.patt` generado
4. Reemplaza `marker.patt` con tu archivo personalizado

### marker.pdf ✅ COMPLETADO

El PDF del marcador ya está creado y listo para imprimir.

**Para regenerar el PDF:**
```bash
node scripts/generate-pdf.js
```

## Estado de los Archivos

Todos los archivos necesarios están listos y la funcionalidad AR está completamente operativa.

## Verificación

Todos los archivos están presentes:
- ✅ `camera_para.dat` (176 bytes)
- ✅ `marker.patt` (286 KB - Marcador Hiro)
- ✅ `marker.pdf` (17 KB - PDF imprimible)
- ✅ `marker-image.jpg` (15 KB - Imagen de referencia)
- ✅ `marker.html` (3.2 KB - Versión HTML para impresión alternativa)

## Uso

Los usuarios pueden:
1. Descargar `marker.pdf` desde la página de descarga
2. Imprimirlo en papel A4
3. Usar el marcador impreso con la aplicación AR

