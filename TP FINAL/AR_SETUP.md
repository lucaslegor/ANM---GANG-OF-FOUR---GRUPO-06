# Configuración de Realidad Aumentada con Marcadores

## Archivos Necesarios ✅ COMPLETADOS

Todos los archivos necesarios ya están generados y listos en `public/ar-data/`:

1. **camera_para.dat** ✅ - Parámetros de la cámara (176 bytes)
2. **marker.patt** ✅ - Patrón del marcador (286 KB - Marcador Hiro)
3. **marker.pdf** ✅ - Marcador imprimible (17 KB)

## Pasos de Configuración

### 1. Descargar camera_para.dat

```bash
curl -o public/ar-data/camera_para.dat https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/data/camera_para.dat
```

O descarga manualmente desde:
https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/data/camera_para.dat

### 2. Generar Marcador Personalizado ✅ COMPLETADO

El marcador Hiro ya está descargado y configurado. Si quieres crear un marcador personalizado:

1. Visita el generador de marcadores de AR.js:
   https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

2. Crea tu marcador personalizado:
   - Sube una imagen o usa el generador
   - Descarga el archivo `.patt` generado
   - Reemplaza `public/ar-data/marker.patt` con tu archivo

### 3. Crear PDF del Marcador ✅ COMPLETADO

El PDF del marcador ya está creado. Para regenerarlo:

```bash
node scripts/generate-pdf.js
```

O usa el marcador Hiro como referencia:
- Imagen: https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/data/hiro.png

## Acceso desde Dispositivos Móviles

⚠️ **IMPORTANTE**: Tu celular **NO puede acceder a `localhost`**. Necesitas usar la IP local de tu computadora.

### Configuración Rápida

1. **Obtén tu IP local:**
   ```bash
   pnpm get-ip
   ```

2. **Inicia el servidor en modo red:**
   ```bash
   pnpm dev:network
   ```

3. **Accede desde tu celular:**
   - Asegúrate de estar en la misma red WiFi
   - Abre: `http://TU_IP:3000` (ej: `http://192.168.1.100:3000`)

📖 **Ver guía completa:** [MOBILE_ACCESS.md](./MOBILE_ACCESS.md)

## Configuración de CORS y HTTPS

### Desarrollo Local

Para desarrollo local, Next.js ya está configurado con CORS. Asegúrate de:

1. **Usar la IP local** (no localhost) para acceso desde móviles
2. Para HTTPS local, puedes usar herramientas como:
   ```bash
   # Con mkcert (recomendado)
   npm install -g mkcert
   mkcert -install
   mkcert localhost TU_IP_LOCAL
   ```
   
   O usar **ngrok** para un túnel HTTPS público (⭐ RECOMENDADO):
   ```bash
   # Instalación (una sola vez)
   npm install -g ngrok
   
   # Uso automatizado (inicia Next.js + ngrok)
   pnpm dev:ngrok
   
   # O uso manual
   pnpm dev:network  # Terminal 1
   ngrok http 3000   # Terminal 2
   ```
   
   ngrok te dará una URL HTTPS pública como: `https://abc123.ngrok-free.app`
   Esta URL funciona desde cualquier dispositivo, incluso fuera de tu red WiFi.

### Producción

1. **HTTPS es obligatorio** para acceso a la cámara en navegadores móviles
2. El archivo `next.config.mjs` ya incluye headers CORS
3. Para Vercel/Netlify, HTTPS se configura automáticamente

## Solución de Problemas

### Problema: "No se puede acceder a la cámara"

**Safari (iOS):**
1. Configuración → Safari → Cámara → Permitir
2. Asegúrate de usar HTTPS o localhost

**Chrome (Android):**
1. Configuración → Permisos → Cámara → Permitir
2. Verifica que el sitio tenga permisos

**General:**
- Usa HTTPS en producción
- Verifica que la URL sea `localhost` o tenga certificado SSL válido
- Recarga la página después de otorgar permisos

### Problema: "Marcador no detectado"

1. Asegúrate de tener buena iluminación
2. El marcador debe estar plano y sin arrugas
3. Mantén el marcador a una distancia adecuada (30-50 cm)
4. Evita reflejos y sombras sobre el marcador

### Problema: "Error al cargar AR.js"

1. Verifica tu conexión a internet (se cargan desde CDN)
2. Verifica la consola del navegador para errores específicos
3. Intenta recargar la página

## Testing

1. Abre el simulador en el navegador
2. Selecciona un cluster y genera el QR
3. Escanea el QR con tu móvil
4. Descarga e imprime el marcador
5. Apunta la cámara al marcador
6. El gráfico 3D debería aparecer sobre el marcador

## Notas Importantes

- **HTTPS es obligatorio** para producción
- Los marcadores deben imprimirse en papel blanco, tamaño A4
- La calidad de la impresión afecta la detección
- Usa buena iluminación para mejor tracking
- El marcador debe estar completamente visible en la cámara

