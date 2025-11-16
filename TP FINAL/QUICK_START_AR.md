# 🚀 Inicio Rápido - Realidad Aumentada

## Opción 1: ngrok (⭐ RECOMENDADO - Más Fácil)

### Paso 1: Iniciar servidor con ngrok
```bash
pnpm dev:ngrok
```

### Paso 2: Esperar la URL
El script te mostrará una URL como:
```
🌐 URL Pública HTTPS:
   https://abc123.ngrok-free.app
```

### Paso 3: Acceder desde tu celular
1. Abre el navegador en tu celular
2. Ve a la URL mostrada (ej: `https://abc123.ngrok-free.app`)
3. Navega al simulador
4. Genera el QR code
5. Escanea el QR (se abrirá la misma URL en AR)
6. Descarga e imprime el marcador
7. Apunta la cámara al marcador
8. ¡Disfruta del gráfico 3D en AR!

**Ventajas:**
- ✅ Funciona desde cualquier dispositivo (no necesita misma WiFi)
- ✅ HTTPS incluido (requerido para cámara)
- ✅ Una sola URL para todo
- ✅ Muy fácil de usar

---

## Opción 2: IP Local (Red WiFi)

### Paso 1: Obtener tu IP
```bash
pnpm get-ip
```
Te mostrará: `192.168.0.16` (ejemplo)

### Paso 2: Iniciar servidor
```bash
pnpm dev:network
```

### Paso 3: Acceder desde celular
1. Asegúrate de estar en la misma red WiFi
2. Abre: `http://TU_IP:3000` (ej: `http://192.168.0.16:3000`)
3. Sigue los mismos pasos que en la Opción 1

**Ventajas:**
- ✅ No requiere instalación adicional
- ✅ Funciona offline (misma red)

**Desventajas:**
- ⚠️ Requiere misma red WiFi
- ⚠️ Algunos navegadores pueden requerir HTTPS para cámara

---

## Solución de Problemas

### El QR code no funciona desde el celular
- **Si usas localhost**: Cambia a ngrok o IP local
- **Si usas IP local**: Verifica que estés en la misma WiFi
- **Si usas ngrok**: La URL debe ser HTTPS

### La cámara no se activa
- Verifica permisos del navegador
- Algunos navegadores requieren HTTPS (usa ngrok)
- Safari iOS: Configuración → Safari → Cámara → Permitir

### ngrok muestra "tunnel session expired"
- Reinicia ngrok (Ctrl+C y vuelve a ejecutar `pnpm dev:ngrok`)
- O configura authtoken para sesiones más largas

---

## Comandos Útiles

```bash
# Ver tu IP local
pnpm get-ip

# Iniciar con ngrok (recomendado)
pnpm dev:ngrok

# Iniciar solo servidor (modo red)
pnpm dev:network

# Iniciar servidor normal (solo localhost)
pnpm dev
```

---

## Interfaz Web de ngrok

Cuando ngrok está corriendo, puedes ver estadísticas en:
http://127.0.0.1:4040

Aquí verás:
- Requests en tiempo real
- Headers y respuestas
- Estadísticas de tráfico

