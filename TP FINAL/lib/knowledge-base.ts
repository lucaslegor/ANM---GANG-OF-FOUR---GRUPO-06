// Base de conocimiento sobre BioGrowth Analytics para el chatbot

export interface KnowledgeEntry {
  keywords: string[]
  title: string
  definition: string
  explanation: string
  examples?: string[]
  relatedTopics?: string[]
}

export const knowledgeBase: Record<string, KnowledgeEntry> = {
  empresa: {
    keywords: ['empresa', 'quienes somos', 'sobre nosotros', 'nosotros', 'bio', 'biogrowth', 'analytics'],
    title: 'BioGrowth Analytics',
    definition: 'BioGrowth Analytics es una plataforma especializada en análisis predictivos y simulaciones de crecimiento bacteriano para optimizar procesos de investigación y desarrollo en biotecnología.',
    explanation: `**Nuestra Misión:**
Proporcionar herramientas avanzadas de análisis y simulación que permitan a investigadores, científicos y empresas del sector biotecnológico optimizar sus procesos de investigación y desarrollo.

**Nuestros Valores:**
- Precisión científica
- Innovación tecnológica
- Facilidad de uso
- Soporte especializado

**Tecnología:**
Utilizamos modelos matemáticos avanzados, regresión polinómica y análisis estadístico para predecir y visualizar el crecimiento bacteriano en diferentes condiciones.`,
    examples: [
      'Somos especialistas en análisis de crecimiento bacteriano',
      'Nuestra plataforma utiliza inteligencia artificial y modelos matemáticos avanzados',
      'Ayudamos a optimizar procesos de investigación en biotecnología'
    ],
    relatedTopics: ['servicios', 'productos', 'precios', 'contacto']
  },

  servicios: {
    keywords: ['servicios', 'que ofrecen', 'que hacen', 'que ofrecemos', 'servicio', 'soluciones'],
    title: 'Nuestros Servicios',
    definition: 'Ofrecemos una plataforma completa de análisis y simulación de crecimiento bacteriano con herramientas interactivas y visualizaciones avanzadas.',
    explanation: `**Servicios Principales:**

1. **Simulador Interactivo**
   - Proyección de crecimiento bacteriano
   - Análisis de múltiples condiciones (temperatura, medio)
   - Visualizaciones 2D y 3D interactivas
   - Cálculo de métricas (R², RMSE, tasa de crecimiento)

2. **Realidad Aumentada (AR)**
   - Visualización 3D de gráficos de crecimiento
   - Experiencia inmersiva desde dispositivos móviles
   - Sin necesidad de descargas adicionales

3. **Dashboard de Análisis**
   - Visualización de datos experimentales
   - Comparación entre diferentes condiciones
   - Exportación de resultados

4. **Asistente Inteligente**
   - Chatbot especializado en crecimiento bacteriano
   - Respuestas a preguntas técnicas y comerciales
   - Soporte 24/7`,
    examples: [
      'Ofrecemos simulaciones precisas de crecimiento bacteriano',
      'Nuestra plataforma incluye visualizaciones en 3D y realidad aumentada',
      'Proporcionamos análisis estadísticos avanzados con métricas como R² y RMSE'
    ],
    relatedTopics: ['productos', 'precios', 'empresa']
  },

  productos: {
    keywords: ['productos', 'producto', 'herramientas', 'plataforma', 'software', 'aplicacion'],
    title: 'Nuestros Productos',
    definition: 'BioGrowth Analytics ofrece una plataforma web completa para análisis y simulación de crecimiento bacteriano.',
    explanation: `**Plataforma Web:**
- Acceso desde cualquier dispositivo con navegador
- Interfaz intuitiva y moderna
- Sin instalación requerida
- Actualizaciones automáticas

**Características Principales:**
- Simulador de crecimiento con múltiples modelos
- Visualizaciones interactivas 2D/3D
- Realidad Aumentada para visualización móvil
- Dashboard de análisis de datos
- API para integración con otros sistemas (próximamente)

**Tecnologías Utilizadas:**
- Modelos de regresión polinómica
- Machine Learning para predicciones
- Visualización 3D con Three.js
- AR.js para realidad aumentada`,
    examples: [
      'Nuestra plataforma web no requiere instalación',
      'Incluimos visualizaciones 3D y realidad aumentada',
      'Utilizamos modelos matemáticos avanzados para predicciones precisas'
    ],
    relatedTopics: ['servicios', 'precios', 'empresa']
  },

  precios: {
    keywords: ['precio', 'precios', 'costo', 'costos', 'plan', 'planes', 'tarifa', 'tarifas', 'pago', 'cuanto cuesta', 'precio'],
    title: 'Planes y Precios',
    definition: 'Ofrecemos diferentes planes adaptados a las necesidades de investigadores, laboratorios y empresas.',
    explanation: `**Planes Disponibles:**

1. **Plan Básico** (Gratis)
   - Acceso al simulador básico
   - Visualizaciones 2D
   - Hasta 10 simulaciones por mes
   - Soporte por email

2. **Plan Profesional** (Desde $29/mes)
   - Acceso completo al simulador
   - Visualizaciones 2D y 3D
   - Realidad Aumentada
   - Simulaciones ilimitadas
   - Exportación de datos
   - Soporte prioritario
   - Acceso a modelos avanzados

3. **Plan Empresarial** (Personalizado)
   - Todo lo del Plan Profesional
   - API para integración
   - Soporte dedicado
   - Capacitación personalizada
   - Análisis de datos personalizados
   - SLA garantizado

**Descuentos:**
- Estudiantes: 50% de descuento
- Instituciones educativas: 30% de descuento
- Contratos anuales: 20% de descuento`,
    examples: [
      'Ofrecemos un plan gratuito para empezar',
      'El plan profesional incluye todas las funcionalidades avanzadas',
      'Tenemos descuentos especiales para estudiantes e instituciones'
    ],
    relatedTopics: ['servicios', 'contacto', 'empresa']
  },

  contacto: {
    keywords: ['contacto', 'contactar', 'email', 'correo', 'telefono', 'direccion', 'soporte', 'ayuda', 'comunicarse'],
    title: 'Contacto y Soporte',
    definition: 'Puedes contactarnos a través de múltiples canales para consultas comerciales, técnicas o de soporte.',
    explanation: `**Canales de Contacto:**

📧 **Email:**
- General: contacto@biogrowthanalytics.com
- Soporte técnico: soporte@biogrowthanalytics.com
- Ventas: ventas@biogrowthanalytics.com

💬 **Chat en Vivo:**
- Disponible en la plataforma (horario comercial)
- Respuesta en menos de 5 minutos

📞 **Teléfono:**
- Lunes a Viernes: 9:00 AM - 6:00 PM (GMT-3)
- Soporte en español e inglés

**Horarios de Atención:**
- Soporte técnico: 24/7 (email)
- Consultas comerciales: Lunes a Viernes 9:00-18:00
- Soporte prioritario: Disponible en planes profesionales`,
    examples: [
      'Puedes contactarnos por email a contacto@biogrowthanalytics.com',
      'Ofrecemos soporte técnico 24/7 por email',
      'El chat en vivo está disponible en horario comercial'
    ],
    relatedTopics: ['precios', 'servicios', 'empresa']
  },

  caracteristicas: {
    keywords: ['caracteristicas', 'funciones', 'funcionalidades', 'features', 'que incluye', 'que tiene'],
    title: 'Características de la Plataforma',
    definition: 'Nuestra plataforma incluye herramientas avanzadas para análisis y visualización de crecimiento bacteriano.',
    explanation: `**Características Principales:**

✅ **Simulador Avanzado**
- Múltiples modelos de crecimiento
- Análisis de diferentes condiciones (temperatura, medio)
- Proyecciones a futuro
- Cálculo automático de métricas

✅ **Visualizaciones Interactivas**
- Gráficos 2D interactivos
- Visualizaciones 3D rotables
- Realidad Aumentada para móviles
- Exportación de gráficos

✅ **Análisis Estadístico**
- Coeficiente de determinación (R²)
- Error cuadrático medio (RMSE)
- Tasa de crecimiento
- Intervalos de confianza

✅ **Interfaz Moderna**
- Diseño futurista y atractivo
- Navegación intuitiva
- Responsive (móvil, tablet, desktop)
- Accesibilidad mejorada

✅ **Asistente Inteligente**
- Chatbot especializado
- Respuestas instantáneas
- Soporte 24/7`,
    examples: [
      'Incluimos visualizaciones 3D y realidad aumentada',
      'Nuestro simulador calcula automáticamente métricas como R² y RMSE',
      'La plataforma es completamente responsive y funciona en cualquier dispositivo'
    ],
    relatedTopics: ['servicios', 'productos', 'empresa']
  },

  casos_uso: {
    keywords: ['caso de uso', 'casos de uso', 'para que sirve', 'usos', 'aplicaciones', 'quien lo usa'],
    title: 'Casos de Uso',
    definition: 'Nuestra plataforma es utilizada por investigadores, laboratorios y empresas en diversos contextos.',
    explanation: `**Usuarios Típicos:**

🔬 **Investigadores y Científicos**
- Optimización de experimentos
- Análisis de datos experimentales
- Publicaciones científicas
- Validación de modelos

🏭 **Laboratorios y Empresas**
- Control de calidad
- Optimización de procesos
- Desarrollo de productos
- Análisis de producción

🎓 **Instituciones Educativas**
- Enseñanza de microbiología
- Proyectos de investigación
- Análisis de datos de estudiantes
- Visualización educativa

**Aplicaciones:**
- Investigación en biotecnología
- Desarrollo de fármacos
- Producción de alimentos
- Tratamiento de aguas residuales
- Investigación médica`,
    examples: [
      'Ideal para laboratorios que necesitan analizar crecimiento bacteriano',
      'Perfecto para investigadores que trabajan con modelos de crecimiento',
      'Útil para instituciones educativas que enseñan microbiología'
    ],
    relatedTopics: ['servicios', 'productos', 'empresa']
  },

  beneficios: {
    keywords: ['beneficios', 'ventajas', 'por que elegirnos', 'por que nosotros', 'ventaja competitiva'],
    title: 'Beneficios de BioGrowth Analytics',
    definition: 'Ofrecemos ventajas competitivas que nos distinguen en el mercado de análisis biotecnológico.',
    explanation: `**Ventajas Clave:**

🚀 **Tecnología Avanzada**
- Modelos matemáticos de última generación
- Visualizaciones 3D y AR innovadoras
- Interfaz moderna y fácil de usar

⚡ **Rapidez y Eficiencia**
- Resultados instantáneos
- Sin necesidad de instalación
- Acceso desde cualquier dispositivo

🎯 **Precisión Científica**
- Modelos validados científicamente
- Métricas estadísticas confiables
- Análisis rigurosos

💡 **Facilidad de Uso**
- Interfaz intuitiva
- Sin conocimientos técnicos avanzados
- Tutoriales y documentación completa

🔒 **Seguridad y Confiabilidad**
- Datos seguros y privados
- Actualizaciones regulares
- Soporte técnico especializado

💰 **Precios Competitivos**
- Plan gratuito disponible
- Precios accesibles
- Descuentos para estudiantes e instituciones`,
    examples: [
      'Nuestra tecnología de visualización 3D y AR es única en el mercado',
      'Ofrecemos resultados instantáneos sin necesidad de instalación',
      'Tenemos precios competitivos con descuentos especiales'
    ],
    relatedTopics: ['servicios', 'productos', 'precios']
  },

  demo: {
    keywords: ['demo', 'demostracion', 'prueba', 'probar', 'test', 'gratis', 'gratuito'],
    title: 'Prueba Gratuita',
    definition: 'Ofrecemos acceso gratuito para que puedas probar la plataforma antes de comprometerte.',
    explanation: `**Plan Gratuito Incluye:**
- Acceso al simulador básico
- Visualizaciones 2D
- Hasta 10 simulaciones por mes
- Sin tarjeta de crédito requerida
- Sin límite de tiempo

**Cómo Empezar:**
1. Regístrate en nuestra plataforma
2. Accede al simulador
3. Explora las funcionalidades
4. Si te gusta, actualiza a un plan de pago

**¿Necesitas más?**
- Prueba el Plan Profesional con 14 días gratis
- Sin compromiso
- Cancela cuando quieras`,
    examples: [
      'Puedes probar la plataforma gratis sin tarjeta de crédito',
      'El plan gratuito incluye hasta 10 simulaciones por mes',
      'Ofrecemos 14 días gratis del plan profesional'
    ],
    relatedTopics: ['precios', 'servicios', 'contacto']
  }
}

// Función para buscar en la base de conocimiento
export function searchKnowledge(query: string): KnowledgeEntry | null {
  const lowerQuery = query.toLowerCase()
  
  // Buscar por keywords
  for (const [key, entry] of Object.entries(knowledgeBase)) {
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return entry
      }
    }
  }
  
  return null
}

// Función para obtener todas las entradas relacionadas
export function getRelatedTopics(topicKey: string): KnowledgeEntry[] {
  const topic = knowledgeBase[topicKey]
  if (!topic || !topic.relatedTopics) return []
  
  return topic.relatedTopics
    .map(key => knowledgeBase[key])
    .filter(Boolean) as KnowledgeEntry[]
}
