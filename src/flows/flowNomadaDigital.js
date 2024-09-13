// src/flows/flowNomadaDigital.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowNomadaDigital = addKeyword(EVENTS.ACTION).addAnswer(
  "Este es el flujo de flowNomadaDigital"
);

module.exports = flowNomadaDigital;
