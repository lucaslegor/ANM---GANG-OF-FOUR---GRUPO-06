# 🧬 Simulación Inteligente de Crecimiento Bacteriano

Proyecto de análisis numérico para modelar y visualizar el crecimiento bacteriano de *E. coli K-12* mediante ajustes por mínimos cuadrados.

## ✨ Características

- 📊 **Simulador Interactivo**: Visualización 2D/3D de curvas de crecimiento
- 🤖 **Chatbot Inteligente**: Asistente IA para preguntas teóricas y cálculos
- 🎯 **Realidad Aumentada**: Visualización AR con tracking de marcadores
- 📈 **Análisis Avanzado**: Cálculo de R², RMSE, tasas de crecimiento
- 🎨 **Diseño Futurista**: Interfaz moderna con efectos neón y animaciones

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com) e inicia sesión
   - Click en **"Add New Project"**
   - Selecciona tu repositorio
   - Vercel detectará automáticamente Next.js

3. **Configuración:**
   - Framework: Next.js (detectado automáticamente)
   - Build Command: `pnpm build` (o `npm run build`)
   - Install Command: `pnpm install` (o `npm install`)
   - Root Directory: `./`

4. **Despliega:**
   - Click en **"Deploy"**
   - Espera 2-5 minutos
   - ¡Listo! Tu sitio estará en `tu-proyecto.vercel.app`

### Opción 2: Con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

## 📋 Pre-requisitos

- Node.js 18.x o superior
- pnpm (recomendado) o npm
- Cuenta de Vercel (gratuita)

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Build de producción
pnpm build

# Ejecutar producción local
pnpm start
```

## 📁 Estructura del Proyecto

```
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Página principal
│   ├── ar-marker/         # Página AR con marcadores
│   └── marker-download/   # Descarga de marcadores
├── components/            # Componentes React
│   ├── simulator-section.tsx
│   ├── ai-assistant.tsx
│   └── growth-chart-3d.tsx
├── lib/                   # Utilidades
│   ├── data-processor.ts  # Procesamiento de datos
│   ├── chatbot-engine.ts  # Motor del chatbot
│   └── knowledge-base.ts # Base de conocimiento
├── public/
│   ├── data/              # Datos CSV
│   └── ar-data/           # Archivos AR (marcadores)
└── scripts/               # Scripts de utilidad
```

## ✅ Checklist Pre-Despliegue

- [x] Build exitoso (`pnpm build`)
- [x] Archivos AR en `public/ar-data/`
- [x] CSV de datos en `public/data/`
- [x] Configuración de CORS en `next.config.mjs`
- [x] Suspense boundaries para `useSearchParams`
- [x] `.gitignore` configurado
- [x] `vercel.json` configurado

## 🔧 Configuración

### Variables de Entorno

No se requieren variables de entorno para el despliegue básico.

Si necesitas agregar variables:
- Vercel Dashboard → Settings → Environment Variables

### Archivos Estáticos

Todos los archivos en `public/` se sirven automáticamente:
- `/data/growth-data.csv` → Datos del simulador
- `/ar-data/marker.patt` → Marcador AR
- `/ar-data/marker.pdf` → PDF del marcador

## 🌐 URLs de Producción

Después del despliegue:
- **Producción**: `https://tu-proyecto.vercel.app`
- **Preview**: Cada push genera una URL única

## 📱 Funcionalidades en Producción

✅ HTTPS automático (requerido para cámara AR)
✅ CORS configurado
✅ Archivos estáticos accesibles
✅ Chatbot funcional
✅ Simulador 2D/3D
✅ Realidad Aumentada

## 🐛 Solución de Problemas

### Build Falla
```bash
# Prueba localmente
pnpm build

# Verifica errores y corrígelos
```

### Archivos AR no encontrados
- Verifica que estén en `public/ar-data/`
- Asegúrate de que no estén en `.gitignore`

### CORS Issues
- Ya configurado en `next.config.mjs`
- Vercel aplica los headers automáticamente

## 📚 Documentación Adicional

- [Guía de Acceso Móvil](./MOBILE_ACCESS.md)
- [Configuración AR](./AR_SETUP.md)
- [Despliegue Detallado](./DEPLOY_VERCEL.md)

## 📄 Licencia

Proyecto académico - Análisis Numérico

---

**Desarrollado con Next.js, React, Three.js y AR.js**


