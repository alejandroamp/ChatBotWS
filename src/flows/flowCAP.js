// src/flows/flowCAP.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowCAP = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "🚛 *¿Eres conductor de camiones y te gustaría venir a trabajar a España?* 🚛\n" +
      "¡Puedes hacerlo a través del curso CAP (Certificado de Aptitud Profesional)! Este curso te preparará para convertirte en conductor profesional en España.",
    { delay: 2000 }
  )
  .addAnswer(
    "📍 *Ubicación del curso*: Barcelona, en la autoescuela *British*.\n" +
      "Este curso intensivo dura 1 mes y te prepara para presentar los exámenes de conductor profesional.",
    { delay: 2000 }
  )
  .addAnswer(
    "💶 *Costos*:\n" +
      "1. Curso CAP: *600€*\n" +
      "2. Alojamiento en residencia (opcional): *200€ adicionales*\n" +
      "3. Trámite de extranjería: *605€*\n" +
      "4. Si necesitas visado (Bolivia, Ecuador): *200€ adicionales*",
    { delay: 2000 }
  )
  .addAnswer(
    "Además, la autoescuela te ayudará a encontrar empleo con empresas de transporte en España una vez que completes el curso. ¡Una gran oportunidad para conductores profesionales! 🛣️",
    { delay: 2000 }
  )
  .addAnswer(
    "📽️ *Seminario informativo*: Si quieres conocer más detalles sobre el curso CAP y nuestra escuela de formación, puedes acceder al seminario desde nuestra página web en el siguiente enlace:\n\n" +
      "👉 *Ver seminario CAP*: https://cinthiacedenourbaez-seminario-gratuito-conductores.site.builderall.net/",
    { delay: 2000 }
  )
  .addAnswer(
    "🔎 *Asesoría gratuita de 10 minutos*: Si tienes dudas sobre el curso, puedes agendar una asesoría gratuita con nuestra abogada en este enlace:\n\n" +
      "👉 *Agendar asesoría*: https://calendly.com/abgcedenoextranjeria/asesoria-cap",
    { delay: 2000 }
  )
  .addAnswer(
    "¡No pierdas la oportunidad de empezar tu carrera como conductor profesional en España! 🚚\n" +
      "Si tienes más preguntas, no dudes en contactarnos. 💬"
  );

module.exports = flowCAP;
