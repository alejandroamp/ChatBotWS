// src/flows/flowResidencias.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowResidencias = addKeyword(EVENTS.ACTION).addAnswer(
  "Este es el flujo de residencias"
);

module.exports = flowResidencias;
