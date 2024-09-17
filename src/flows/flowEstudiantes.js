// src/flows/flowEstudiantes.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowEstudiantes = addKeyword(EVENTS.ACTION)
  .addAnswer(
    [
      "🎓 *Oportunidades para Estudiantes en España* 🎓",
      "\nSi estás pensando en estudiar en España, ¡tenemos excelentes noticias para ti! 📚✨ Ya sea que busques continuar tus estudios, o incluso si eres conductor de camiones, España tiene muchas oportunidades para ofrecerte.",
    ],
    { delay: 300 }
  )
  .addAnswer(
    [
      "🚛 *Curso CAP para Conductores de Camiones*: Si eres conductor, puedes venir a España y realizar el curso CAP, que te permitirá trabajar en toda Europa como conductor profesional. ¡Es una gran oportunidad para expandir tu carrera! 🌍",
    ],
    { delay: 300 }
  )
  .addAnswer(
    [
      "💼 *Visa de Estudio*: El costo del trámite de la visa de estudio es de *413,22€* + IVA.",
      "\nEste trámite te permitirá realizar tus estudios en España de manera legal y disfrutar de todo lo que este país tiene para ofrecer.",
    ],
    { delay: 300 }
  )
  .addAnswer(
    [
      "📞 Si estás interesado en saber más sobre estas oportunidades, no dudes en ponerte en contacto con nosotros.",
      "\n👉 *Teléfono*: 924 932 020",
      "👉 *Correo*: info@cinthiacedeno.es",
      "\nEstamos aquí para ayudarte a cumplir tus sueños de estudiar y vivir en España. ¡No lo pienses más! 🌟",
    ],
    { delay: 300 }
  );

module.exports = flowEstudiantes;
