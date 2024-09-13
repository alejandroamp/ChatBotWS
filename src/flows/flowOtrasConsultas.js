// src/flows/flowOtrasConsultas.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowOtrasConsultas = addKeyword(EVENTS.ACTION).addAnswer(
  "Este es el flujo de flowOtrasConsultas"
);

module.exports = flowOtrasConsultas;
