const {
    showMainMenu,
    showNacionalidadMenu,
    handleNacionalidadName,
    handleTiempoResidencia,
    handleExamenCervantes,
    handlePresupuesto,
    handleResidencias,
    handleEstudiantes,
    handleBolsaDeEmpleo,
    handleEscritosYRecursos
} = require('./menuHandler');
const sendMessageWithDelay = require('../utils/sendMessageWithDelay');

let context = {};

module.exports = function handleMessage(client, message) {
    const chatId = message.from;
    const lowerCaseMessage = message.body.toLowerCase();

    if (!context[chatId]) {
        context[chatId] = {};
    }

    if (lowerCaseMessage === 'hola' || lowerCaseMessage === 'menu') {
        showMainMenu(client, chatId);
    } else if (lowerCaseMessage === '1' && !context[chatId].nombre) {
        showNacionalidadMenu(client, chatId);
    } else if (context[chatId].step === 'cervantes') {
        handleExamenCervantes(client, chatId, lowerCaseMessage, context[chatId]);
    } else if (context[chatId].step === 'presupuesto' || context[chatId].step === 'presupuesto_no_examen') {
        handlePresupuesto(client, chatId, message.body, context[chatId]);
    } else if (!context[chatId].nombre) {
        handleNacionalidadName(client, chatId, message.body, context[chatId]);
    } else if (!context[chatId].tiempo_residencia) {
        handleTiempoResidencia(client, chatId, lowerCaseMessage, context[chatId]);
    } else if (lowerCaseMessage === '2') {
        handleResidencias(client, chatId);
    } else if (lowerCaseMessage === '3') {
        handleEstudiantes(client, chatId);
    } else if (lowerCaseMessage === '4') {
        handleBolsaDeEmpleo(client, chatId);
    } else if (lowerCaseMessage === '5') {
        handleEscritosYRecursos(client, chatId);
    } else {
        sendMessageWithDelay(client, chatId, 'Lo siento, no he entendido tu mensaje. Por favor, selecciona una opción del menú principal. 🙏');
        showMainMenu(client, chatId);
    }
};
