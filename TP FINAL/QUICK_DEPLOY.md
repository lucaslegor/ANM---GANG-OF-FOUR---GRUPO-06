# ⚡ Despliegue Rápido en Vercel

## 🎯 Pasos Rápidos (5 minutos)

### 1. Sube tu código a GitHub

```bash
# Si no tienes Git inicializado
git init
git add .
git commit -m "Ready for deployment"

# Crea un repo en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### 2. Despliega en Vercel

1. Ve a **https://vercel.com** e inicia sesión (puedes usar GitHub)
2. Click en **"Add New Project"**
3. Selecciona tu repositorio
4. Vercel detectará automáticamente:
   - ✅ Framework: Next.js
   - ✅ Build Command: `pnpm build`
   - ✅ Install Command: `pnpm install`
5. Click en **"Deploy"**
6. Espera 2-5 minutos
7. ¡Listo! 🎉

## ✅ Verificación

Tu sitio estará disponible en: `https://tu-proyecto.vercel.app`

**Verifica que funcione:**
- ✅ Página principal carga
- ✅ Navegación entre secciones
- ✅ Simulador funciona
- ✅ Chatbot responde
- ✅ AR funciona (requiere HTTPS - ya incluido)

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push`, Vercel desplegará automáticamente.

## 📝 Notas

- **HTTPS**: Automático ✅
- **Cámara AR**: Funciona con HTTPS ✅
- **Build time**: ~2-5 minutos
- **Plan gratuito**: 100GB/mes de ancho de banda

---

**¿Problemas?** Ver [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) para guía detallada.


