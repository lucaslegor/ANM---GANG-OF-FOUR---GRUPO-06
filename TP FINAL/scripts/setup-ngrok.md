# Configuración de ngrok

## Instalación Rápida

### Opción 1: npm (Recomendado)
```bash
npm install -g ngrok
```

### Opción 2: Descarga Directa
1. Visita: https://ngrok.com/download
2. Descarga para tu sistema operativo
3. Extrae el ejecutable
4. Agrega a PATH o usa la ruta completa

### Opción 3: Chocolatey (Windows)
```bash
choco install ngrok
```

## Verificar Instalación

```bash
ngrok version
```

Deberías ver algo como: `ngrok version 3.x.x`

## Uso Básico

### Iniciar túnel manualmente

1. Inicia el servidor Next.js:
   ```bash
   pnpm dev:network
   ```

2. En otra terminal, inicia ngrok:
   ```bash
   ngrok http 3000
   ```

3. ngrok mostrará una URL como:
   ```
   Forwarding  https://abc123.ngrok-free.app -> http://localhost:3000
   ```

4. Usa esa URL HTTPS desde tu celular

### Usar el script automatizado

```bash
pnpm dev:ngrok
```

Esto iniciará tanto el servidor Next.js como ngrok automáticamente.

## Interfaz Web de ngrok

Cuando ngrok está corriendo, puedes ver:
- Estadísticas de tráfico
- Requests en tiempo real
- Replay de requests
- Inspección de headers

Accede a: http://127.0.0.1:4040

## Cuenta de ngrok (Opcional)

### Cuenta Gratuita
1. Regístrate en: https://dashboard.ngrok.com/signup
2. Obtén tu authtoken
3. Configura: `ngrok config add-authtoken TU_TOKEN`

### Beneficios de tener cuenta:
- URLs personalizadas
- Más tiempo de sesión
- Estadísticas avanzadas
- Múltiples túneles

### Sin cuenta:
- Funciona perfectamente
- URLs aleatorias
- Sesiones de 2 horas (luego se renueva)

## Solución de Problemas

### "ngrok: command not found"
- Verifica que ngrok esté en tu PATH
- O usa la ruta completa al ejecutable

### "Tunnel session expired"
- Reinicia ngrok (Ctrl+C y vuelve a ejecutar)
- O configura authtoken para sesiones más largas

### "Address already in use"
- Verifica que el puerto 3000 esté libre
- O cambia el puerto: `ngrok http 3001`

## Alternativas a ngrok

Si ngrok no funciona, puedes usar:

- **Cloudflare Tunnel**: `cloudflared tunnel --url http://localhost:3000`
- **localtunnel**: `npx localtunnel --port 3000`
- **serveo**: `ssh -R 80:localhost:3000 serveo.net`

