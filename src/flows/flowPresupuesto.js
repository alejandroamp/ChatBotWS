// src/flows/flowPresupuesto.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPresupuesto = addKeyword(EVENTS.ACTION)
  .addAnswer(
    [
      "¿Te gustaría conocer nuestro presupuesto para gestionar el trámite por ti? (Responde 'sí' o 'no')",
    ],
    {
      capture: true,
      delay: 300,
    },
    async (ctx, { flowDynamic, state }) => {
      const myState = await state.getMyState();
      console.log("Estado en flowPresupuesto:", myState); // Verifica el estado en el flujo del presupuesto

      const respuesta = ctx.body.trim().toLowerCase();
      console.log("Respuesta del usuario en flowPresupuesto:", respuesta); // Verifica la respuesta del usuario

      const tieneCervantes = myState.tieneCervantes;
      console.log("Valor de tieneCervantes:", tieneCervantes); // Verifica el valor de tieneCervantes

      if (respuesta === "sí" || respuesta === "si" || respuesta === "1") {
        // Si el usuario tiene la prueba de Cervantes (descuento aplicado)
        if (tieneCervantes == "1") {
          await flowDynamic([
            `✨ ¡Gracias, ${myState.name}!`,
            "Nuestro servicio de gestión de trámites para la nacionalidad cuesta **490€ IVA incluido**.",
            { delay: 1000 },
            "Puedes pagar en **2 partes** o en **un solo pago** y te descontamos **50€** (total: 440€).",
            { delay: 1000 },
            "🎯 Contarás con nuestro apoyo en cada paso del proceso, asegurándote de que todo se haga correctamente y sin estrés. ¡Deja que los expertos te guíen! 😊",
          ]);
        } else {
          // Si el usuario no tiene la prueba de Cervantes (sin descuento)
          await flowDynamic([
            `✨ ¡Gracias, ${myState.name}!`,
            "Nuestro servicio de gestión de trámites para la nacionalidad cuesta **490€ IVA incluido**.",
            { delay: 1000 },
            "Puedes pagar en **2 partes**.",
            { delay: 1000 },
            "🎯 Contarás con nuestro apoyo en cada paso del proceso, asegurándote de que todo se haga correctamente y sin estrés. ¡Deja que los expertos te guíen! 😊",
          ]);
        }
      } else if (respuesta === "no") {
        // Mensaje de agradecimiento si responde "no"
        await flowDynamic([
          `Gracias por tu respuesta, ${myState.name}.`,
          //{ delay: 1000 },
          "Si en algún momento decides continuar con el trámite, estaremos aquí para ayudarte. ¡No dudes en contactarnos! 😊",
        ]);
      } else {
        // Respuesta inválida: vuelve a preguntar "sí" o "no"
        await flowDynamic("Por favor responde 'sí' o 'no' para continuar.");
      }
    }
  )
  .addAnswer(
    [
      "Si tienes dudas puedes agendar una llamda **GRATUITA** de 10min con la abogada para que te explique el proceso",
      "👉 https://calendly.com/abgcedenoextranjeria/obten-tu-nacionalidad 👈",
    ],
    { delay: 200 }
  );
/*   .addAnswer(["Volviendo..."], { delay: 1000 }, async (_, { gotoFlow }) => {
    return gotoFlow(require("./flowMenu.js"));
  }); */
/* .addAnswer(
    "¿Te gustaría volver al menú principal? (Responde 'sí' o 'no')",
    { capture: true, delay: 200 },
    async (ctx, { gotoFlow, flowDynamic }) => {
      const respuesta = ctx.body.trim().toLowerCase();

      // Verificar si el usuario quiere volver al menú principal
      if (respuesta === "sí" || respuesta === "si") {
        await flowDynamic("Regresando al menú principal...");
        return gotoFlow(require("./flowMenu.js")); // Redirige al flujo del menú
      } else if (respuesta === "no") {
        await flowDynamic(
          "Gracias por usar nuestros servicios. ¡Hasta luego! 😊"
        );
      } else {
        await flowDynamic("Por favor responde 'sí' o 'no' para continuar.");
      }
    }
  ); */

module.exports = flowPresupuesto;
