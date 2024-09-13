// src/flows/flowNacionalidad.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { nacionalidad, OPCIONES_NACIONALIDAD } = require("../constantes");
const validarRespuesta = require("../utils/validarRespuesta");

const flowNacionalidad = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "Muy bien! Ahora, ¿cuánto tiempo llevas como residente legal en España? 🇪🇸",
    {
      delay: 200,
    }
  )
  .addAnswer(
    nacionalidad,
    {
      capture: true,
      delay: 200,
    },
    async (ctx, { gotoFlow, flowDynamic, fallBack }) => {
      if (!validarRespuesta(ctx.body, OPCIONES_NACIONALIDAD)) {
        return fallBack(
          "Respuesta no valida, por favor selecciona una de las opciones"
        );
      }
      switch (ctx.body) {
        case "1":
          return gotoFlow(require("./flowMas2Anos.js"));
        case "2":
          return await flowDynamic(
            "Gracias por la información. Estamos aquí para ayudarte cuando estés listo para avanzar en tu proceso de nacionalidad. 😊"
          );
        case "3":
          return await flowDynamic(
            "¡Estás casi allí! 🎯 Una vez cumplas los 2 años, estaremos listos para ayudarte a obtener tu nacionalidad. 😊"
          );
        case "4":
          return await flowDynamic(
            "No te preocupes, estamos aquí para guiarte. Contáctanos para recibir asesoría personalizada. 💬"
          );
      }
    }
  );

module.exports = flowNacionalidad;
