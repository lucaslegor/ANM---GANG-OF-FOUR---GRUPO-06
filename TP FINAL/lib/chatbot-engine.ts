// Motor del chatbot: detecta intenciones y genera respuestas

import { searchKnowledge, getRelatedTopics, knowledgeBase } from './knowledge-base'
import { CLUSTER_OPTIONS, predictGrowth, calculateGrowthRate } from './data-processor'
// Removed useGrowthData import - we'll pass getClusterById as parameter

export type MessageType = 'theoretical' | 'calculation' | 'mixed' | 'greeting' | 'unknown'

export interface ChatbotResponse {
  type: MessageType
  content: string
  calculationResult?: {
    cluster?: string
    t1?: number
    t2?: number
    growthRate?: number
    r2?: number
    rmse?: number
    projection?: number
  }
  relatedTopics?: string[]
}

// Patrones para detectar preguntas de cálculo
const calculationPatterns = [
  /tasa.*crecimiento.*entre.*(\d+).*y.*(\d+)/i,
  /crecimiento.*entre.*(\d+).*y.*(\d+)/i,
  /calcular.*tasa/i,
  /cuál.*tasa.*(\d+).*(\d+)/i,
  /qué.*tasa.*(\d+).*(\d+)/i,
  /r²|r2|coeficiente.*determinación/i,
  /rmse|error.*cuadrático/i,
  /proyectar.*crecimiento/i,
  /predicción.*tiempo.*(\d+)/i,
  /crecimiento.*tiempo.*(\d+)/i,
]

// Patrones para detectar preguntas teóricas
const theoreticalPatterns = [
  /qué.*es/i,
  /cómo.*funciona/i,
  /cómo.*se.*calcula/i,
  /explica/i,
  /definición/i,
  /qué.*significa/i,
  /por qué/i,
  /cuál.*diferencia/i,
]

// Patrones para detectar saludos
const greetingPatterns = [
  /hola|hi|hello|buenos|buenas/i,
  /gracias|thanks|thank you/i,
  /adiós|bye|chau/i,
]

export function detectIntent(query: string): MessageType {
  const lowerQuery = query.toLowerCase()
  
  // Verificar saludos
  if (greetingPatterns.some(pattern => pattern.test(query))) {
    return 'greeting'
  }
  
  // Verificar si es pregunta de cálculo
  const isCalculation = calculationPatterns.some(pattern => pattern.test(query))
  
  // Verificar si es pregunta teórica
  const isTheoretical = theoreticalPatterns.some(pattern => pattern.test(query)) ||
                       searchKnowledge(query) !== null
  
  if (isCalculation && isTheoretical) {
    return 'mixed'
  } else if (isCalculation) {
    return 'calculation'
  } else if (isTheoretical) {
    return 'theoretical'
  }
  
  return 'unknown'
}

export function extractCalculationParams(query: string): {
  cluster?: string
  t1?: number
  t2?: number
  projectionTime?: number
} {
  const params: { cluster?: string; t1?: number; t2?: number; projectionTime?: number } = {}
  
  // Extraer tiempos
  const timeMatches = query.match(/(\d+)\s*(?:y|and|a|hora|horas|hour|hours)/gi)
  if (timeMatches && timeMatches.length >= 2) {
    const times = timeMatches.map(m => parseInt(m.match(/\d+/)?.[0] || '0'))
    if (times.length >= 2) {
      params.t1 = Math.min(times[0], times[1])
      params.t2 = Math.max(times[0], times[1])
    }
  } else {
    // Buscar patrones como "entre 2 y 4"
    const betweenMatch = query.match(/(?:entre|between)\s*(\d+)\s*(?:y|and|a)\s*(\d+)/i)
    if (betweenMatch) {
      params.t1 = parseInt(betweenMatch[1])
      params.t2 = parseInt(betweenMatch[2])
    }
  }
  
  // Extraer clúster
  for (const option of CLUSTER_OPTIONS) {
    const clusterKeywords = [
      option.label.toLowerCase(),
      option.id.toLowerCase(),
      option.temperature.toString(),
      option.medium.toLowerCase(),
    ]
    
    if (clusterKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
      params.cluster = option.id
      break
    }
  }
  
  // Extraer tiempo de proyección
  const projectionMatch = query.match(/(?:proyectar|proyección|predicción|predecir).*(?:tiempo|time)?.*(\d+)/i)
  if (projectionMatch) {
    params.projectionTime = parseInt(projectionMatch[1])
  }
  
  return params
}

export function generateResponse(
  query: string,
  getClusterById: (id: string) => any
): ChatbotResponse {
  const intent = detectIntent(query)
  const lowerQuery = query.toLowerCase()
  
  // Respuestas a saludos
  if (intent === 'greeting') {
    if (/hola|hi|hello|buenos|buenas/i.test(query)) {
      return {
        type: 'greeting',
        content: '¡Hola! 👋 Soy tu asistente inteligente para BioGrowth Analytics. Puedo ayudarte con:\n\n📊 **Cálculos**: Tasas de crecimiento, proyecciones, métricas (R², RMSE)\n📚 **Teoría**: Explicaciones sobre regresión lineal, mínimos cuadrados, modelos de crecimiento\n\n¿En qué puedo ayudarte?'
      }
    }
    if (/gracias|thanks/i.test(query)) {
      return {
        type: 'greeting',
        content: '¡De nada! 😊 Si tienes más preguntas, estaré aquí para ayudarte.'
      }
    }
    if (/adiós|bye|chau/i.test(query)) {
      return {
        type: 'greeting',
        content: '¡Hasta luego! 👋 Fue un placer ayudarte. Vuelve cuando necesites más información.'
      }
    }
  }
  
  // Respuestas teóricas
  if (intent === 'theoretical' || intent === 'mixed') {
    const knowledge = searchKnowledge(query)
    
    if (knowledge) {
      let response = `## ${knowledge.title}\n\n${knowledge.definition}\n\n`
      
      if (knowledge.formula) {
        response += `**Fórmula:**\n\`\`\`\n${knowledge.formula}\n\`\`\`\n\n`
      }
      
      response += `**Explicación:**\n${knowledge.explanation}\n\n`
      
      if (knowledge.examples && knowledge.examples.length > 0) {
        response += `**Ejemplos:**\n`
        knowledge.examples.forEach((example, i) => {
          response += `${i + 1}. ${example}\n`
        })
        response += `\n`
      }
      
      const related = getRelatedTopics(Object.keys(knowledgeBase).find(
        key => knowledgeBase[key] === knowledge
      ) || '')
      
      if (related.length > 0) {
        response += `**Temas relacionados:** ${related.map(t => t.title).join(', ')}\n`
      }
      
      return {
        type: intent,
        content: response,
        relatedTopics: related.map(t => t.title)
      }
    }
  }
  
  // Respuestas de cálculo
  if (intent === 'calculation' || intent === 'mixed') {
    const params = extractCalculationParams(query)
    const clusterId = params.cluster || '25-rich'
    const clusterData = getClusterById(clusterId)
    
    if (!clusterData || !clusterData.model) {
      return {
        type: 'calculation',
        content: '⚠️ No pude encontrar los datos del clúster solicitado. Por favor, especifica el clúster (ej: "25°C - Medio Rico") o selecciona uno de los disponibles.'
      }
    }
    
    const { model, rSquared, rmse } = clusterData
    const r2 = rSquared || 0
    const clusterOption = CLUSTER_OPTIONS.find(opt => opt.id === clusterId)
    
    let response = ''
    const calculationResult: ChatbotResponse['calculationResult'] = {
      cluster: clusterId,
      r2: r2,
      rmse: rmse
    }
    
    // Cálculo de tasa de crecimiento
    if (params.t1 !== undefined && params.t2 !== undefined) {
      const growth1 = predictGrowth(model, params.t1)
      const growth2 = predictGrowth(model, params.t2)
      const growthRate = calculateGrowthRate(model, params.t1, params.t2)
      
      calculationResult.t1 = params.t1
      calculationResult.t2 = params.t2
      calculationResult.growthRate = growthRate
      
      response += `## 📊 Cálculo de Tasa de Crecimiento\n\n`
      response += `**Clúster:** ${clusterOption?.label || clusterId}\n\n`
      response += `**Parámetros:**\n`
      response += `- Tiempo inicial (t₁): ${params.t1} horas\n`
      response += `- Tiempo final (t₂): ${params.t2} horas\n`
      response += `- Crecimiento en t₁: ${growth1.toFixed(4)}\n`
      response += `- Crecimiento en t₂: ${growth2.toFixed(4)}\n\n`
      response += `**Tasa de Crecimiento:**\n\`\`\`\nTasa = (g(t₂) - g(t₁)) / (t₂ - t₁)\nTasa = (${growth2.toFixed(4)} - ${growth1.toFixed(4)}) / (${params.t2} - ${params.t1})\nTasa = ${growthRate.toFixed(4)} unidades/hora\n\`\`\`\n\n`
      
      // Si es pregunta mixta, agregar explicación teórica
      if (intent === 'mixed') {
        const knowledge = searchKnowledge('tasa_crecimiento')
        if (knowledge) {
          response += `## 📚 Explicación Teórica\n\n${knowledge.definition}\n\n`
          response += `**Fórmula:** ${knowledge.formula}\n\n`
        }
      }
    }
    
    // Proyección de crecimiento
    if (params.projectionTime !== undefined) {
      const projection = predictGrowth(model, params.projectionTime)
      calculationResult.projection = projection
      
      if (!response) {
        response += `## 🔮 Proyección de Crecimiento\n\n`
        response += `**Clúster:** ${clusterOption?.label || clusterId}\n\n`
      }
      response += `**Proyección a ${params.projectionTime} horas:** ${projection.toFixed(4)}\n\n`
    }
    
    // Mostrar métricas del modelo
    if (/r²|r2|coeficiente|rmse|error/i.test(query)) {
      if (!response) {
        response += `## 📈 Métricas del Modelo\n\n`
        response += `**Clúster:** ${clusterOption?.label || clusterId}\n\n`
      }
      response += `**Métricas:**\n`
      response += `- **R² (Coeficiente de Determinación):** ${r2.toFixed(4)}\n`
      response += `- **RMSE (Error Cuadrático Medio):** ${rmse.toFixed(4)}\n\n`
      
      // Interpretación
      if (r2 > 0.9) {
        response += `✅ El modelo tiene un **excelente ajuste** (R² > 0.9)\n`
      } else if (r2 > 0.7) {
        response += `✅ El modelo tiene un **buen ajuste** (R² > 0.7)\n`
      } else {
        response += `⚠️ El modelo tiene un ajuste moderado (R² < 0.7)\n`
      }
    }
    
    if (!response) {
      response = `He procesado tu consulta para el clúster **${clusterOption?.label || clusterId}**.\n\n`
      response += `**Métricas del modelo:**\n`
      response += `- R²: ${r2.toFixed(4)}\n`
      response += `- RMSE: ${rmse.toFixed(4)}\n\n`
      response += `¿Quieres calcular algo específico? Por ejemplo:\n`
      response += `- "¿Cuál es la tasa de crecimiento entre 2 y 4 horas?"\n`
      response += `- "Proyecta el crecimiento a 12 horas"`
    }
    
    return {
      type: intent,
      content: response,
      calculationResult
    }
  }
  
  // Respuesta por defecto
  return {
    type: 'unknown',
    content: `No estoy seguro de cómo ayudarte con eso. 🤔\n\nPuedo ayudarte con:\n\n📊 **Cálculos**:\n- "¿Cuál es la tasa de crecimiento entre 2 y 4 horas para 25°C - Medio Rico?"\n- "Proyecta el crecimiento a 12 horas"\n- "¿Cuál es el R² del modelo?"\n\n📚 **Preguntas teóricas**:\n- "¿Qué es la regresión lineal?"\n- "¿Cómo se calcula el R²?"\n- "¿Qué significa la tasa de crecimiento?"\n\n¿Puedes reformular tu pregunta?`
  }
}

