// src/flows/flowNacionalidad.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { nacionalidad, OPCIONES_NACIONALIDAD } = require("../constantes");
const validarRespuesta = require("../utils/validarRespuesta");

const flowMas2Anos = require("./flowMas2Anos.js");
const flowAsesorias = require("./flowAsesorias.js");
const flowResidencias = require("./flowResidencias.js");

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
    async (ctx, { flowDynamic, fallBack, gotoFlow, state }) => {
      console.log("Respuesta del usuario (años de residencia):", ctx.body);

      if (!validarRespuesta(ctx.body, OPCIONES_NACIONALIDAD)) {
        return fallBack(
          "Respuesta no válida, por favor selecciona una de las opciones"
        );
      }

      // Limpia cualquier respuesta previa sobre si quiere conocer residencias o si está casado
      await state.update({ preguntarResidencias: false, casado: false });

      // Guardamos la opción de años de residencia en el estado
      await state.update({ tiempoResidencia: ctx.body });
      const myState = await state.getMyState();
      console.log("Estado actualizado:", myState);

      switch (ctx.body) {
        case "1":
          console.log("Redirigiendo a flowMas2Anos.js");
          return gotoFlow(flowMas2Anos);

        case "2":
          console.log(
            "Usuario tiene menos de 2 años. Preguntar si está casado."
          );
          await flowDynamic([
            "Recuerda que debes esperar a tener **2 AÑOS CUMPLIDOS CON RESIDENCIA LEGAL** para poder avanzar en tu proceso de nacionalidad. 😊",
            "Si estás casad@ con un ciudadan@ Español, hij@ o niet@ de Español de origen, el plazo de solicitud es de **1 AÑO CON RESIDENCIA LEGAL**.",
            "\n¿Estás casado o casada con un ciudadano español? (Responde 'sí' o 'no')",
          ]);
          await state.update({ casado: true });
          return;

        case "3":
          console.log("Usuario no tiene residencia legal. Mostrando opciones.");
          await flowDynamic([
            "Para solicitar la nacionalidad, primeramente debes ser residente legal en España. 📜",
            "¿Te gustaría conocer los tipos de residencias disponibles en España? (Responde 'sí' o 'no')",
          ]);
          await state.update({ preguntarResidencias: true });
          return;
      }
    }
  )
  .addAction(
    {
      capture: true,
      delay: 200,
    },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      console.log(
        "Respuesta del usuario (si está casado o sobre residencias):",
        ctx.body
      );

      // Recuperamos la información del estado
      const { preguntarResidencias, casado } = await state.getMyState();
      const respuesta = ctx.body.trim().toLowerCase();

      // Manejo de la respuesta sobre residencias
      if (preguntarResidencias) {
        if (respuesta === "sí" || respuesta === "si") {
          console.log("Redirigiendo a flowResidencias.js");
          return gotoFlow(flowResidencias);
        } else if (respuesta === "no") {
          console.log("El usuario no quiere conocer los tipos de residencias.");
          return await flowDynamic(
            "No te preocupes, estamos aquí para guiarte en lo que necesites. 💬"
          );
        } else {
          console.log("Respuesta inválida sobre las residencias.");
          return await flowDynamic(
            "Por favor responde 'sí' o 'no' para continuar."
          );
        }
      }

      // Manejo de la respuesta sobre si está casado
      if (casado) {
        if (respuesta === "sí" || respuesta === "si") {
          console.log("Redirigiendo a flowMas2Anos.js por estar casado.");
          return gotoFlow(flowMas2Anos);
        } else if (respuesta === "no") {
          console.log("Redirigiendo a flowAsesorias.js por no estar casado.");
          await flowDynamic([
            "No te preocupes, si tienes dudas o quieres más detalles, podemos ofrecerte asesorías personalizadas. 💬",
          ]);
          return gotoFlow(flowAsesorias);
        } else {
          console.log("Respuesta inválida sobre casado.");
          return await flowDynamic(
            "Por favor responde 'sí' o 'no' para continuar."
          );
        }
      }
    }
  );

module.exports = flowNacionalidad;
