// src/flows/flowWelcome.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowWelcome = addKeyword(EVENTS.WELCOME).addAnswer(
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
      await flowDynamic(`Encantada *${myState.name}*, continuamos...`);
      return gotoFlow(require("./flowMenu.js"));
    }
  }
);

module.exports = flowWelcome;
