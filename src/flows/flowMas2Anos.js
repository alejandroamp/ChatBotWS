// src/flows/flowMas2Anos.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const validarRespuesta = require("../utils/validarRespuesta");
const {
  cervantes,
  mensajesGenerales,
  OPCIONES_MAS2ANOS,
} = require("../constantes");

const flowMas2Anos = addKeyword(EVENTS.ACTION).addAnswer(
  cervantes,
  {
    capture: true,
    delay: 200,
  },
  async (ctx, { gotoFlow, flowDynamic, fallBack, state }) => {
    const myState = await state.getMyState();
    console.log("Estado inicial en flowMas2Anos:", myState); // Verifica el estado inicial

    // Validar la respuesta del usuario
    if (!validarRespuesta(ctx.body, OPCIONES_MAS2ANOS)) {
      return fallBack(
        "Respuesta no valida, por favor selecciona una de las opciones"
      );
    }

    // Guardar en el estado si el usuario tiene la prueba de Cervantes (opción 1) o no (opción 2)
    await state.update({ tieneCervantes: ctx.body });
    console.log(
      "Estado actualizado en flowMas2Anos:",
      await state.getMyState()
    ); // Verifica el estado después de la actualización

    switch (ctx.body) {
      case "1":
        await flowDynamic([
          `¡Fantástico, ${myState.name}! 🌟 Ya estás en camino. Los requisitos brevemente son los siguientes:`,
          { delay: 1000 },
          mensajesGenerales.requisitos,
        ]);
        return gotoFlow(require("./flowPresupuesto.js")); // Redirige al flujo del presupuesto
      case "2":
        await flowDynamic([
          `¡No te preocupes, ${myState.name}! Podemos ayudarte a reservar una plaza para el examen de Cervantes. 💪`,
          { delay: 1000 },
          "El costo aproximado del examen es de 85€, pagadero en la plataforma oficial.",
          { delay: 1000 },
          mensajesGenerales.requisitos,
        ]);
        return gotoFlow(require("./flowPresupuesto.js")); // Redirige al flujo del presupuesto
    }
  }
);

module.exports = flowMas2Anos;
