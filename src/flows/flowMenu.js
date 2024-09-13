// src/flows/flowMenu.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { menu, OPCIONES_MENU } = require("../constantes");
const validarRespuesta = require("../utils/validarRespuesta");

const flowMenu = addKeyword(EVENTS.ACTION).addAnswer(
  menu,
  { capture: true, delay: 500 },
  async (ctx, { gotoFlow, fallBack }) => {
    if (!validarRespuesta(ctx.body, OPCIONES_MENU)) {
      return fallBack(
        "Respuesta no valida, por favor selecciona una de las opciones"
      );
    }
    switch (ctx.body) {
      case "1":
        return gotoFlow(require("./flowNacionalidad.js"));
      case "2":
        return gotoFlow(require("./flowResidencias.js"));
      case "3":
        return gotoFlow(require("./flowEstudiantes.js"));
      case "4":
        return gotoFlow(require("./flowEmpleo.js"));
      case "5":
        return gotoFlow(require("./flowAsilo.js"));
      case "6":
        return gotoFlow(require("./flowNomadaDigital.js"));
      case "7":
        return gotoFlow(require("./flowAsesorias.js"));
      case "8":
        return gotoFlow(require("./flowOtrasConsultas.js"));
    }
  }
);

module.exports = flowMenu;
