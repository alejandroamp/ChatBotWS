// src/flows/flowEmpleo.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowEmpleo = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "📢 *Bolsa de Empleo* 📢",
    "\n¿Estás buscando trabajo en España? 🌍 ¡Queremos ayudarte a conectarte con esas oportunidades! 😊",
    "\n🔹 *Importante*: Unirte al grupo y formar parte de nuestra base de datos para empleos es totalmente gratis",
    "\n🔗 Únete a nuestro grupo de Facebook donde publicamos las ofertas disponibles: [Únete al grupo de Facebook](https://www.facebook.com/groups/trabajaenespana)",
    "\n✍️ Además, te invitamos a llenar nuestro formulario para formar parte de nuestra base de datos y poder contactarte cuando surjan oportunidades: [Rellenar formulario](https://forms.gle/zq34J9vFdJtkzYaMA)",
    "\n¡Te deseamos mucha suerte en tu búsqueda de empleo! 💼",
  ],
  { delay: 300 }
);

module.exports = flowEmpleo;
