// src/flows/flowNomadaDigital.js
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowNomadaDigital = addKeyword(EVENTS.ACTION)
  .addAnswer(
    [
      "🌍 *Nómada Digital en España* 🌍",
      "\n¿Te gustaría vivir y trabajar como nómada digital en España? ¡Extremadura te está esperando con una oportunidad increíble! 💼",
      "\n✨ *Extremadura está ofreciendo hasta 15.000€ en ayudas para nómadas digitales*. Es una oportunidad única para establecerte en una de las regiones más hermosas de España y aprovechar sus recursos y conectividad. 💶",
    ],
    { delay: 300 }
  )
  .addAnswer(
    [
      "🎥 Aquí te dejamos un video: \n👉 [Ver video en Instagram](https://www.instagram.com/reel/C_lMH26IMk5/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==)",
    ],
    { delay: 300 }
  )
  .addAnswer(
    [
      "📝 También puedes leer nuestro artículo completo sobre esta iniciativa y cómo puedes beneficiarte: \n👉 [Leer artículo en nuestro blog](https://cinthiacedeno.es/nomada-digital-extremadura-ayudas-15000-euros/)",
      "\nNo dudes en contactarnos si tienes alguna pregunta. Estamos aquí para ayudarte a aprovechar esta gran oportunidad. 💬",
      "\n📞 *Teléfono*: 924 932 020",
      "✉️ *Correo*: info@cinthiacedeno.es",
    ],
    { delay: 300 }
  );

module.exports = flowNomadaDigital;
