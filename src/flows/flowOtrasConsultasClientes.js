// src/flows/flowOtrasConsultasClientes.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { numberClean } = require("../utils/numberClean");
const { addToBlackList, getBlackList } = require("../blacklist");

const flowOtrasConsultasClientes = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic }) => {
    const cleanNumber = numberClean(ctx.from); // Limpiamos el número del usuario

    // Continuamos con la consulta directamente
    await flowDynamic([
      "👋 ¡Hola! Por favor, deja tu consulta y nos pondremos en contacto contigo lo antes posible.",
    ]);
  })
  .addAction(
    {
      capture: true,
      delay: 100,
    },
    async (ctx, { flowDynamic, endFlow }) => {
      const cleanNumber = numberClean(ctx.from); // Limpiamos el número nuevamente
      const consulta = ctx.body.trim(); // Capturamos la consulta

      console.log(`Número recibido: ${cleanNumber}`);
      console.log(`Consulta recibida: ${consulta}`);

      // Agregamos el número a la lista negra directamente
      addToBlackList(cleanNumber);
      console.log(`Número ${cleanNumber} añadido a la lista negra.`);

      // Respondemos al usuario indicándole que ha sido muteado y finalizamos el flujo
      await flowDynamic([
        "Gracias por tu consulta, te contactaremos pronto. 😊",
      ]);

      // Imprimir la lista actualizada de números bloqueados
      const updatedBlackList = getBlackList();
      console.log("Lista actualizada de números bloqueados:", updatedBlackList);

      // No redirigimos a ningún flujo ni mostramos más mensajes, detenemos el bot aquí.
      return endFlow; // Finalizamos el flujo para que no continúe
    }
  );

module.exports = flowOtrasConsultasClientes;
