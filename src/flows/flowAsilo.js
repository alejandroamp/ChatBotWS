// src/flows/flowAsilo.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowAsilo = addKeyword(EVENTS.ACTION).addAnswer(
  "Este es el flujo de flowAsilo"
);

module.exports = flowAsilo;
