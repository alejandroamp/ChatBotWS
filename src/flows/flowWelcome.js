// src/flows/flowWelcome.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowWelcome = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { state, gotoFlow }) => {
    try {
      const myState = await state.getMyState();

      // Verificar si myState está definido y si tiene el nombre
      if (myState && myState.name) {
        // Si ya está definido, ir directamente al menú
        return gotoFlow(require("./flowMenu.js"));
      }
    } catch (error) {
      console.error("Error en el flujo de bienvenida:", error);
    }
  })
  .addAnswer(
    ["👋 ¡Hola!", "Bienvenido, primeramente dime tu nombre por favor."],
    {
      capture: true,
      delay: 100,
    },
    async (ctx, { flowDynamic, fallBack, gotoFlow, state }) => {
      if (isNaN(ctx.body) === false) {
        return fallBack("Disculpa no entendi...");
      } else {
        await state.update({ name: ctx.body });
        const myState = await state.getMyState();

        // Verificar si myState está definido y tiene el nombre antes de continuar
        if (myState && myState.name) {
          await flowDynamic(`Encantada *${myState.name}*, continuamos...`);
        }

        return gotoFlow(require("./flowMenu.js"));
      }
    }
  );

module.exports = flowWelcome;
