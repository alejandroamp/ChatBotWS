// src/flows/flowEstudiantes.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowEstudiantes = addKeyword(EVENTS.ACTION).addAnswer(
  "Este es el flujo de residencias"
);

module.exports = flowEstudiantes;
