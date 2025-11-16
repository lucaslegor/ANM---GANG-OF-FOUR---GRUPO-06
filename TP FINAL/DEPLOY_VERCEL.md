# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu proyecto de Simulación de Crecimiento Bacteriano en Vercel.

## ✅ Pre-requisitos

1. **Cuenta de Vercel**: Crea una cuenta gratuita en [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Tu código debe estar en un repositorio Git
3. **Node.js**: Asegúrate de tener Node.js instalado localmente (para pruebas)

## 📋 Checklist Pre-Despliegue

Antes de desplegar, verifica que:

- ✅ Todos los archivos están guardados
- ✅ El proyecto compila sin errores (`pnpm build`)
- ✅ Los archivos AR están en `public/ar-data/`:
  - `camera_para.dat`
  - `marker.patt`
  - `marker.pdf`
- ✅ El archivo CSV está en `public/data/growth-data.csv`
- ✅ No hay errores de TypeScript críticos

## 🚀 Método 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir código a GitHub

```bash
# Si aún no tienes un repositorio Git
git init
git add .
git commit -m "Initial commit - Proyecto de Simulación Bacteriana"

# Crea un repositorio en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **"Add New Project"** o **"Import Project"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 3: Configuración del Proyecto

Vercel debería detectar automáticamente:
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build` (o `npm run build`)
- **Output Directory**: `.next`
- **Install Command**: `pnpm install` (o `npm install`)

**Configuración recomendada:**
- **Node.js Version**: 18.x o superior
- **Package Manager**: pnpm (o npm)
- **Root Directory**: `./` (raíz del proyecto)

### Paso 4: Variables de Entorno (si las necesitas)

Si tu proyecto requiere variables de entorno:
1. En la configuración del proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Agrega las variables necesarias

### Paso 5: Desplegar

1. Click en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ¡Listo! Tu sitio estará disponible en `tu-proyecto.vercel.app`

## 🚀 Método 2: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
# o
pnpm add -g vercel
```

### Paso 2: Iniciar sesión

```bash
vercel login
```

### Paso 3: Desplegar

```bash
# Desde la raíz del proyecto
vercel

# Para producción
vercel --prod
```

Sigue las instrucciones en la terminal.

## 🔧 Configuración Adicional

### Variables de Entorno

Si necesitas variables de entorno, agrégalas en:
- **Vercel Dashboard** → Tu Proyecto → **Settings** → **Environment Variables**

O desde CLI:
```bash
vercel env add VARIABLE_NAME
```

### Dominio Personalizado

1. Ve a **Settings** → **Domains**
2. Agrega tu dominio
3. Sigue las instrucciones para configurar DNS

### Configuración de Build

El archivo `vercel.json` ya está configurado con:
- Build command: `pnpm build`
- Install command: `pnpm install`
- Framework: Next.js

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

1. **Página principal**: `https://tu-proyecto.vercel.app`
2. **Navegación**: Todas las secciones funcionan
3. **Simulador**: Los gráficos se cargan correctamente
4. **AR**: Los archivos AR están accesibles en `/ar-data/`
5. **Chatbot**: El asistente IA funciona
6. **Responsive**: El sitio se ve bien en móvil

## 🐛 Solución de Problemas

### Error: "Build Failed"

**Solución:**
```bash
# Prueba el build localmente primero
pnpm build

# Si hay errores, corrígelos antes de desplegar
```

### Error: "Module not found"

**Solución:**
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `pnpm install` se ejecute correctamente

### Error: "AR files not found"

**Solución:**
- Verifica que los archivos en `public/ar-data/` estén en el repositorio
- Asegúrate de que no estén en `.gitignore`

### Error: "CORS issues"

**Solución:**
- El archivo `next.config.mjs` ya tiene headers CORS configurados
- Si persisten problemas, verifica la configuración

## 📊 Monitoreo y Analytics

Vercel incluye:
- **Analytics**: Métricas de rendimiento automáticas
- **Logs**: Ver logs en tiempo real
- **Deployments**: Historial de todos los despliegues

## 🔄 Actualizaciones Futuras

Para actualizar el sitio:

1. **Con GitHub**:
   ```bash
   git add .
   git commit -m "Actualización"
   git push
   ```
   Vercel desplegará automáticamente

2. **Con CLI**:
   ```bash
   vercel --prod
   ```

## 📝 Notas Importantes

- **HTTPS**: Vercel proporciona HTTPS automáticamente ✅
- **Cámara AR**: Funcionará correctamente con HTTPS ✅
- **Archivos estáticos**: Todo en `public/` se sirve automáticamente ✅
- **Build time**: ~2-5 minutos en el plan gratuito
- **Límites**: Plan gratuito incluye 100GB de ancho de banda/mes

## 🎉 ¡Listo!

Tu proyecto estará disponible en:
- **URL de producción**: `https://tu-proyecto.vercel.app`
- **URL de preview**: Cada push genera una URL de preview única

¡Felicitaciones! Tu simulador de crecimiento bacteriano está en producción. 🚀


