// src/flows/flowWelcome.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { numberClean } = require("../utils/numberClean");
const { isBlackListed } = require("../blacklist");

const flowWelcome = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { state, gotoFlow }) => {
    const cleanNumber = numberClean(ctx.from);
    console.log(
      `Verificando si el número ${cleanNumber} está en la lista negra...`
    );

    // Verificar si el número está en la lista negra
    if (isBlackListed(cleanNumber)) {
      console.log(
        `Número ${cleanNumber} está en la lista negra. Deteniendo flujo.`
      );
      return false; // Detener el flujo si está bloqueado
    }

    console.log(
      `Número ${cleanNumber} NO está en la lista negra. Continuando...`
    );

    // Obtener el estado del usuario
    const myState = await state.getMyState();

    // Verificar si myState está definido y si tiene el nombre
    if (myState && myState.name) {
      return gotoFlow(require("./flowMenu.js"));
    }
  })
  .addAction(async (ctx, { flowDynamic, state, gotoFlow }) => {
    const cleanNumber = numberClean(ctx.from);

    // Segunda verificación si el número está en la lista negra antes del `addAnswer`
    if (isBlackListed(cleanNumber)) {
      console.log(`Número ${cleanNumber} bloqueado antes de pedir nombre.`);
      return false; // Detener flujo aquí
    }

    // Obtener el estado del usuario
    const myState = await state.getMyState();

    // Si myState no está definido o no tiene el nombre, solicitar el nombre
    if (!myState || !myState.name) {
      return await flowDynamic([
        "Muchas gracias por contactar con nuestro despacho de Abogados, ¿podrías decirnos tu nombre por favor?",
      ]);
    }
  })
  .addAction(
    {
      capture: true,
      delay: 100,
    },
    async (ctx, { flowDynamic, fallBack, gotoFlow, state }) => {
      const cleanNumber = numberClean(ctx.from);

      // Verificar nuevamente si el número ha sido bloqueado después de la respuesta
      if (isBlackListed(cleanNumber)) {
        console.log(`Número ${cleanNumber} bloqueado después de pedir nombre.`);
        return false; // Detener el flujo
      }

      if (isNaN(ctx.body) === false) {
        return fallBack("Disculpa, no entendí...");
      } else {
        // Actualizar el estado con el nombre proporcionado por el usuario
        await state.update({ name: ctx.body });
        const myState = await state.getMyState();

        // Verificar si myState está definido y tiene el nombre antes de continuar
        if (myState && myState.name) {
          await flowDynamic(`Encantada *${myState.name}*, continuamos...`);
        }

        // Ir al menú principal
        return gotoFlow(require("./flowMenu.js"));
      }
    }
  );

module.exports = flowWelcome;
