// src/flows/flowAsilo.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowAsilo = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "📝 *Escritos y Recursos de Asilo* 📝",
    "\nOfrecemos asistencia especializada en la preparación de *escritos y recursos de asilo*. Si necesitas ayuda con trámites, revisiones o apelaciones, estamos aquí para guiarte en cada paso del proceso. ✨",
    "\n💼 *Precio del trámite*: 350€ + IVA.",
    "\n🔗 Si deseas obtener más detalles o ver el catálogo completo de nuestros servicios por WhatsApp.",
    "\n👉 [Ver más detalles](https://wa.me/c/34627091975)",
    "\n📞 Si tienes dudas o necesitas más información, no dudes en llamarnos al 📞 *924 932 020*.",
  ],
  { delay: 300 }
);

module.exports = flowAsilo;
