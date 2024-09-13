// src/flows/flowAsesorias.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowAsesorias = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "\n📞 *Asesoría online de 30 minutos* – *50€*",
    "🔹 Ideal para consultas rápidas o dudas específicas.",
  ])
  .addAnswer([
    "\n📞 *Asesoría online de 1 hora* – *80€*",
    "🔹 Para una revisión completa y detallada de tu caso.",
  ])
  .addAnswer([
    "\n🏢 *Asesoría presencial en Badajoz*",
    "🔹 Si prefieres un trato directo, ven a nuestra oficina para hablar cara a cara.",
  ])
  .addAnswer(
    [
      "💳 *Pagos*:",
      "Los pagos de las asesorías se realizan a través de nuestra página web, utilizando tarjeta de crédito o débito.",
      "Si prefieres pagar con *Bizum* o *transferencia bancaria*, puedes ponerte en contacto con nosotros al 📞 *924 932 020*.",
    ],
    { delay: 500 }
  )
  .addAction(async (ctx, { flowDynamic, state }) => {
    const myState = await state.getMyState();
    await flowDynamic([
      `*${myState.name}* 🔗 Puedes reservar tu asesoría directamente aquí: \n👉 [Haz clic para reservar](https://cinthiacedeno.es/asesorias-en-extranjeria-e-inmigracion/)`,
      "\n✨ ¡Te ayudaremos en cada paso del camino! No dudes en contactarnos si tienes más preguntas.",
      "\n📞 *Teléfono*: 924 932 020",
      "✉️ *Correo*: info@cinthiacedeno.es",
    ]);
  });

module.exports = flowAsesorias;
