// src/flows/flowEmpleo.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowEmpleo = addKeyword(EVENTS.ACTION).addAnswer(
  "Este es el flujo de flowEmpleo"
);

module.exports = flowEmpleo;
