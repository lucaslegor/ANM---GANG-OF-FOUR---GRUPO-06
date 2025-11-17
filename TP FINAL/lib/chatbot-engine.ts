// Motor del chatbot: detecta intenciones y genera respuestas sobre la empresa

import { searchKnowledge, getRelatedTopics, knowledgeBase } from './knowledge-base'

export type MessageType = 'company' | 'greeting' | 'unknown'

export interface ChatbotResponse {
  type: MessageType
  content: string
  relatedTopics?: string[]
}

// Patrones para detectar preguntas sobre la empresa
const companyPatterns = [
  /empresa|quienes somos|sobre nosotros|nosotros|bio|biogrowth/i,
  /servicios|que ofrecen|que hacen|que ofrecemos|soluciones/i,
  /productos|producto|herramientas|plataforma|software|aplicacion/i,
  /precio|precios|costo|costos|plan|planes|tarifa|cuanto cuesta/i,
  /contacto|contactar|email|correo|telefono|soporte|ayuda/i,
  /caracteristicas|funciones|funcionalidades|features|que incluye/i,
  /caso de uso|casos de uso|para que sirve|usos|aplicaciones|quien lo usa/i,
  /beneficios|ventajas|por que elegirnos|por que nosotros/i,
  /demo|demostracion|prueba|probar|test|gratis|gratuito/i,
]

// Patrones para detectar saludos
const greetingPatterns = [
  /hola|hi|hello|buenos|buenas/i,
  /gracias|thanks|thank you/i,
  /adiós|bye|chau|hasta luego/i,
]

export function detectIntent(query: string): MessageType {
  const lowerQuery = query.toLowerCase()
  
  // Verificar saludos
  if (greetingPatterns.some(pattern => pattern.test(query))) {
    return 'greeting'
  }
  
  // Verificar si es pregunta sobre la empresa
  const isCompany = companyPatterns.some(pattern => pattern.test(query)) ||
                   searchKnowledge(query) !== null
  
  if (isCompany) {
    return 'company'
  }
  
  return 'unknown'
}

export function generateResponse(query: string): ChatbotResponse {
  const intent = detectIntent(query)
  const lowerQuery = query.toLowerCase()
  
  // Respuestas a saludos
  if (intent === 'greeting') {
    if (/hola|hi|hello|buenos|buenas/i.test(query)) {
      return {
        type: 'greeting',
        content: '¡Hola! 👋 Bienvenido a **BioGrowth Analytics**.\n\nSoy tu asistente virtual y estoy aquí para ayudarte con cualquier pregunta sobre:\n\n🏢 **Nuestra Empresa**\n💰 **Planes y Precios**\n🛠️ **Servicios y Productos**\n📞 **Contacto y Soporte**\n\n¿En qué puedo ayudarte hoy?'
      }
    }
    if (/gracias|thanks/i.test(query)) {
      return {
        type: 'greeting',
        content: '¡De nada! 😊 Estoy aquí para ayudarte. Si tienes más preguntas sobre BioGrowth Analytics, no dudes en preguntarme.'
      }
    }
    if (/adiós|bye|chau|hasta luego/i.test(query)) {
      return {
        type: 'greeting',
        content: '¡Hasta luego! 👋 Fue un placer ayudarte. Esperamos verte pronto en BioGrowth Analytics.\n\nSi necesitas más información, puedes contactarnos en **contacto@biogrowthanalytics.com**'
      }
    }
  }
  
  // Respuestas sobre la empresa
  if (intent === 'company') {
    const knowledge = searchKnowledge(query)
    
    if (knowledge) {
      let response = `## ${knowledge.title}\n\n${knowledge.definition}\n\n`
      
      response += `**${knowledge.explanation}**\n\n`
      
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
        response += `**Temas relacionados:**\n`
        related.forEach(topic => {
          response += `- ${topic.title}\n`
        })
        response += `\n`
      }
      
      // Agregar call-to-action según el tema
      if (knowledge.title === 'Planes y Precios' || knowledge.title === 'Prueba Gratuita') {
        response += `💡 **¿Quieres probar la plataforma?** Puedes registrarte gratis y empezar a usar el simulador ahora mismo.\n\n`
      }
      
      if (knowledge.title === 'Contacto y Soporte') {
        response += `📧 **¿Tienes más preguntas?** No dudes en contactarnos directamente. Estamos aquí para ayudarte.\n\n`
      }
      
      return {
        type: 'company',
        content: response,
        relatedTopics: related.map(t => t.title)
      }
    }
    
    // Respuesta genérica sobre la empresa si no se encuentra un tema específico
    return {
      type: 'company',
      content: `¡Hola! 👋 Soy el asistente de **BioGrowth Analytics**.\n\nPuedo ayudarte con información sobre:\n\n🏢 **Nuestra Empresa** - Quiénes somos y qué hacemos\n🛠️ **Servicios y Productos** - Qué ofrecemos\n💰 **Planes y Precios** - Opciones disponibles\n📞 **Contacto** - Cómo comunicarte con nosotros\n✨ **Características** - Qué incluye la plataforma\n🎯 **Casos de Uso** - Para quién es útil\n💡 **Beneficios** - Por qué elegirnos\n\n¿Sobre qué te gustaría saber más?`
    }
  }
  
  // Respuesta por defecto
  return {
    type: 'unknown',
    content: `No estoy seguro de cómo ayudarte con eso. 🤔\n\nPuedo ayudarte con información sobre:\n\n🏢 **Nuestra Empresa**\n💰 **Planes y Precios**\n🛠️ **Servicios y Productos**\n📞 **Contacto y Soporte**\n✨ **Características de la Plataforma**\n🎯 **Casos de Uso**\n💡 **Beneficios**\n\n**Ejemplos de preguntas:**\n- "¿Qué servicios ofrecen?"\n- "¿Cuánto cuesta?"\n- "¿Cómo los contacto?"\n- "¿Qué incluye la plataforma?"\n- "¿Puedo probarlo gratis?"\n\n¿Puedes reformular tu pregunta?`
  }
}
