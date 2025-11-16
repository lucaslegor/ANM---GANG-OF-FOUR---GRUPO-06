# Acceso desde Dispositivos Móviles

## Problema: localhost no funciona en celulares

Cuando desarrollas en `localhost` o `127.0.0.1`, tu celular **no puede acceder** porque `localhost` en el celular se refiere al propio dispositivo, no a tu computadora.

## Solución: Usar la IP Local

### Paso 1: Obtener tu IP Local

Ejecuta en la terminal:

```bash
pnpm get-ip
```

Esto mostrará tu IP local (por ejemplo: `192.168.1.100`)

### Paso 2: Iniciar el servidor en modo red

En lugar de `pnpm dev`, usa:

```bash
pnpm dev:network
```

Esto iniciará el servidor escuchando en todas las interfaces de red (0.0.0.0), permitiendo que otros dispositivos en tu red se conecten.

### Paso 3: Acceder desde tu celular

1. **Asegúrate de que tu celular y computadora estén en la misma red WiFi**

2. **Abre el navegador en tu celular** y ve a:
   ```
   http://TU_IP_LOCAL:3000
   ```
   Por ejemplo: `http://192.168.1.100:3000`

3. **Escanea el código QR** desde el simulador

## Verificación Rápida

1. Ejecuta `pnpm get-ip` para ver tu IP
2. Ejecuta `pnpm dev:network` para iniciar el servidor
3. Abre `http://TU_IP:3000` en tu celular
4. Deberías ver la aplicación funcionando

## Solución de Problemas

### El celular no puede conectarse

**Verifica:**
- ✅ Celular y computadora en la misma red WiFi
- ✅ Firewall de Windows permite conexiones en puerto 3000
- ✅ Usaste `pnpm dev:network` (no `pnpm dev`)
- ✅ La IP es correcta (ejecuta `pnpm get-ip` de nuevo)

**Permitir puerto en Firewall de Windows:**
1. Abre "Firewall de Windows Defender"
2. Click en "Configuración avanzada"
3. Click en "Reglas de entrada" → "Nueva regla"
4. Selecciona "Puerto" → Siguiente
5. TCP → Puerto específico: 3000 → Siguiente
6. Permitir la conexión → Siguiente
7. Aplica a todos los perfiles → Siguiente
8. Nombre: "Next.js Dev Server" → Finalizar

### Error de CORS

Si ves errores de CORS, el archivo `next.config.mjs` ya está configurado con headers CORS. Si persiste:

1. Reinicia el servidor: `Ctrl+C` y luego `pnpm dev:network`
2. Limpia la caché del navegador en tu celular

### HTTPS requerido para cámara

Algunos navegadores móviles requieren HTTPS para acceder a la cámara. Opciones:

**Opción 1: Usar ngrok (Recomendado para desarrollo)**
```bash
# Instalar ngrok
npm install -g ngrok

# En otra terminal, después de iniciar pnpm dev:network
ngrok http 3000
```

Esto te dará una URL HTTPS pública (ej: `https://abc123.ngrok.io`)

**Opción 2: Configurar HTTPS local con mkcert**
```bash
# Instalar mkcert
npm install -g mkcert
mkcert -install

# Crear certificado
mkcert localhost TU_IP_LOCAL

# Configurar Next.js para usar HTTPS (requiere configuración adicional)
```

## Alternativa: Usar ngrok (HTTPS Público) ⭐ RECOMENDADO

ngrok crea un túnel HTTPS público, perfecto para desarrollo móvil ya que:
- ✅ Funciona desde cualquier dispositivo (no necesita misma red WiFi)
- ✅ Proporciona HTTPS (requerido para cámara en algunos navegadores)
- ✅ Fácil de usar

### Instalación Rápida

```bash
npm install -g ngrok
```

### Uso Automatizado (Más Fácil)

```bash
pnpm dev:ngrok
```

Esto iniciará automáticamente:
1. El servidor Next.js en modo red
2. ngrok creando el túnel HTTPS

Te mostrará una URL como: `https://abc123.ngrok-free.app`

### Uso Manual

1. Inicia el servidor:
   ```bash
   pnpm dev:network
   ```

2. En otra terminal, inicia ngrok:
   ```bash
   ngrok http 3000
   ```

3. Usa la URL HTTPS mostrada desde tu celular

### Interfaz Web de ngrok

Accede a http://127.0.0.1:4040 para ver:
- Estadísticas de tráfico
- Requests en tiempo real
- Inspección de datos

📖 **Ver guía completa:** [scripts/setup-ngrok.md](./scripts/setup-ngrok.md)

### Otras Alternativas

- **Cloudflare Tunnel**: `cloudflared tunnel --url http://localhost:3000`
- **localtunnel**: `npx localtunnel --port 3000`

## Resumen de Comandos

```bash
# Ver tu IP local
pnpm get-ip

# Iniciar servidor accesible desde red local
pnpm dev:network

# Iniciar servidor + ngrok (HTTPS público) ⭐ RECOMENDADO
pnpm dev:ngrok

# Acceder desde celular
# Opción 1: http://TU_IP:3000 (misma WiFi)
# Opción 2: https://abc123.ngrok-free.app (cualquier lugar)
```

📖 **Guía rápida:** [QUICK_START_AR.md](./QUICK_START_AR.md)

