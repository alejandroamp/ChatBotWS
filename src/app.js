const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowWelcome = require("./flows/flowWelcome");
const flowMenu = require("./flows/flowMenu");
const flowNacionalidad = require("./flows/flowNacionalidad");
const flowResidencias = require("./flows/flowResidencias");
const flowEstudiantes = require("./flows/flowEstudiantes");
const flowEmpleo = require("./flows/flowEmpleo");
const flowAsilo = require("./flows/flowAsilo");
const flowMas2Anos = require("./flows/flowMas2Anos");
const flowPresupuesto = require("./flows/flowPresupuesto");
const flowNomadaDigital = require("./flows/flowNomadaDigital");
const flowAsesorias = require("./flows/flowAsesorias");
const flowCAP = require("./flows/flowAsesorias");
const flowOtrasConsultasClientes = require("./flows/flowOtrasConsultasClientes");
const { getBlackList } = require("./blacklist"); // Importamos la lista negra

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowWelcome,
    flowMenu,
    flowNacionalidad,
    flowResidencias,
    flowEstudiantes,
    flowEmpleo,
    flowAsilo,
    flowNomadaDigital,
    flowMas2Anos,
    flowPresupuesto,
    flowAsesorias,
    flowOtrasConsultasClientes,
    flowCAP,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot(
    {
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    },
    { blackList: getBlackList() } // Pasamos la lista negra directamente a la configuración del bot
  );

  QRPortalWeb();
};

main();
