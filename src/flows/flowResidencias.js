// src/flows/flowResidencias.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const validarRespuesta = require("../utils/validarRespuesta");
const { OPCIONES_RESIDENCIAS } = require("../constantes");

const flowResidencias = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "🏡 *Opciones de Residencia en España* 🏡",
    "\nPor favor, selecciona una de las opciones de residencia para ver los requisitos y el costo del trámite:",
    "\n1️⃣ *Arraigo por formación*",
    "2️⃣ *Arraigo social*",
    "3️⃣ *Arraigo familiar*",
    "4️⃣ *Tarjeta de familiar comunitario*",
    "5️⃣ *Nómada digital*",
    "6️⃣ *Residencia no lucrativa*",
  ],
  { capture: true, delay: 300 },
  async (ctx, { flowDynamic, fallBack }) => {
    if (!validarRespuesta(ctx.body, OPCIONES_RESIDENCIAS)) {
      return fallBack(
        "Opción no válida. Por favor selecciona una opción del 1 al 6."
      );
    }
    switch (ctx.body) {
      case "1":
        await flowDynamic([
          "📚 *Arraigo por formación*",
          "Costo del trámite: *490€*.",
          "\n*Requisitos*:",
          "🔹 Permanencia en España de mínimo 2 años.",
          "🔹 Pasaporte completo.",
          "🔹 Certificado de empadronamiento.",
          "🔹 Antecedentes penales de tu país (apostillados).",
          "🔹 Pruebas que demuestren la permanencia en España durante los dos años.",
        ]);
        break;

      case "2":
        await flowDynamic([
          "🤝 *Arraigo social*",
          "Costo del trámite: *605€*.",
          "\n*Requisitos*:",
          "🔹 3 años de permanencia en España.",
          "🔹 Pre contrato de trabajo.",
          "🔹 Empadronamiento.",
          "🔹 Pasaporte completo.",
          "🔹 Antecedentes penales.",
          "🔹 Algunas comunidades autónomas pueden solicitar otros requisitos.",
        ]);
        break;

      case "3":
        await flowDynamic([
          "👪 *Arraigo familiar*",
          "Costo del trámite: *490€*.",
          "\n*Requisitos*:",
          "🔹 Ser pareja o conyuge de Español, padre o madre de un menor de nacionalidad española, hijo menor de 21 años de un ciudadano español, o hijos mayores a cargo, o padre, madre de Español mayor de 65 años a cargo",
          "🔹 Certificado de empadronamiento coelctivo.",
          "🔹 Pasaporte completo.",
          "🔹 Antecedentes penales de tu país.",
          "🔹 Prueba del vinculo con el ciudadano Español (acta de matrimonio, acta de nacimiento)",
          "🔹 Acta de nacimiento.",
        ]);
        break;

      case "4":
        await flowDynamic([
          "🛂 *Tarjeta de familiar comunitario*",
          "Costo del trámite: *490€*.",
          "\n*Requisitos*:",
          "🔹 Ser familiar de un ciudadano de la Unión Europea o del Espacio Económico Europeo.",
          "🔹 Certificado de empadronamiento colectivo.",
          "🔹 Pasaporte del solicitante y del familiar comunitario.",
          "🔹 Documento que acredite el vínculo familiar (matrimonio, pareja registrada, etc.).",
          "🔹 Seguro médico y medios económicos.",
          "🔹 Medios económicos.",
        ]);
        break;

      case "5":
        await flowDynamic([
          "🌍 *Nómada digital*",
          "Costo del trámite: *790*.",
          "\n*Requisitos*:",
          "🔹 Trabajar de forma remota o freelancer que trabaja para una empresa fuera de España minimo 3 meses de antiguedad",
          "🔹 Demostrar la actividad de la empresa o empresas y su antiguedad (mas de 1 años constituida).",
          "🔹 Demostrar que el trabajo se realiza de forma remota.",
          "🔹 Seguro médico privado.",
          "🔹 Prueba de ingresos suficientes 2 Salarios Minimos Interprofesional(mínimo 2.700€ mensuales).",
          "🔹 Pasaporte completo.",
          "🔹 Copia de la titulacion academica relacionada con la actividad o acreditacion de experiencia profesional minima de 3 años.",
          "🔹 Antecedentes penales del los paises en los que has vivido los ultimos 5 años",
        ]);
        break;

      case "6":
        await flowDynamic([
          "💼 *Residencia no lucrativa*",
          "Costo del trámite: *700€*.",
          "\n*Requisitos*:",
          "🔹 No realizar actividades laborales o profesionales en España.",
          "🔹 Demostrar medios económicos suficientes para ti y tu familia (mínimo 30.000€ al año).",
          "🔹 Seguro médico privado.",
          "🔹 Certificado de antecedentes penales.",
          "🔹 Pasaporte completo.",
        ]);
        break;
    }
  }
);

module.exports = flowResidencias;
